use axum::{extract::State, http::StatusCode, response::IntoResponse, Json};
use bcrypt::{hash, DEFAULT_COST};
use mongodb::{bson::{doc, oid::ObjectId, Uuid}, Client, Collection};
use rand::Rng;
use crate::{models::user::{User, UserSchema}, smtp::SMTPMailSender};

const DB_NAME: &str = "StuddyBuddy";
const COLLECTIONS_NAME: &str = "Users";

// #[derive(Debug)]
// enum RegisterResponse {
//     Status
// }

async fn existing_user(collection: &Collection<UserSchema>, user: &User) -> Result<bool, String> {
    match collection.find_one(doc! { "username" : &user.username, "email" : &user.email }, None).await {
        Ok(Some(_)) => Ok(true),
        Ok(None) => Ok(false),
        Err(err) => Err(err.to_string())
    }
}

async fn existing_non_verified_user(collection: &Collection<UserSchema>, user: &UserSchema) -> Result<bool, String> {
    match collection.find_one(doc! { "username" : &user.username, "email" : &user.email, "verified" : &user.verified }, None).await {
        Ok(Some(_)) => Ok(true),
        Ok(None) => Ok(false),
        Err(err) => Err(err.to_string())
    }
}

pub async fn register(client: State<Client>, Json(req): Json<User>) -> (StatusCode, Json<String>) {
    let collection: Collection<UserSchema> = client.database(DB_NAME).collection(COLLECTIONS_NAME);
    let verification_token: String = rand::thread_rng()
        .sample_iter(&rand::distributions::Uniform::new(char::from(45), char::from(126)))
        .take(20)
        .map(char::from)
        .filter(|c| *c != ' ')
        .collect();

    println!("verification_token: {:?}", verification_token);

    let new_user = UserSchema {
        _id: ObjectId::new(),
        username: req.username.clone(),
        email: req.email.clone(),
        phone_no: req.phone_no.clone(),
        password: hash(req.password.clone(), DEFAULT_COST).unwrap(),
        verified: false,
        verification_token,
    };

    if !existing_user(&collection, &req).await.unwrap() {
        collection.insert_one(&new_user, None).await.unwrap();  
    }

    let (mail_status, mail_message) = match existing_non_verified_user(&collection, &new_user).await {
        Ok(true) => SMTPMailSender::new(req.email).send_verification_mail(&new_user).await,
        Ok(false) => (StatusCode::ALREADY_REPORTED, Json(String::from("User already verified"))),
        Err(err) => return (StatusCode::INTERNAL_SERVER_ERROR, Json(format!("{:?}", err))),
    };

    println!("id: {:?}", new_user._id);
    println!("status: {}", mail_status);
   
    if mail_status == StatusCode::OK {
        match collection.update_one(doc! { "username" : &new_user.username, "email" : &new_user.email },
            doc!{ "$set" : { "verified" : true }}, 
            None)
        .await {
            Ok(_) => {
                println!("updated:");
                println!("id: {:?}", new_user._id);
                return (StatusCode::OK, Json(String::from("User added and verified!!")));
            }            
            Err(err) => return (StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Couldn't update the verification: {}", err)))
        };
    } else {
        return (mail_status, mail_message);
    }

    //(StatusCode::OK, Json(String::new()))
}
