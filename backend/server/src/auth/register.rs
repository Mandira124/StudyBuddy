use std::time::{SystemTime, UNIX_EPOCH};

use axum::{extract::State, http::StatusCode, Json};
use bcrypt::{hash, DEFAULT_COST};
use mongodb::{bson::{doc, oid::ObjectId}, Client, Collection};
use rand::{thread_rng, Rng};
use serde::{Deserialize, Serialize};
use crate::{models::{otp::{RegisterRequest, RegisterResponse}, user::{User, UserSchema}}, smtp::SMTPMailSender};

const DB_NAME: &str = "StuddyBuddy";
const COLLECTIONS_NAME: &str = "Users";

pub fn generate_otp() -> u32 {
    let time = SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs() / 30;
    println!("time {:?}", time);
    let mut rng = thread_rng();
    let random_number: u32 = rng.gen_range(1000..1000000);
    let otp = (time as u32 ^ random_number) % 1000000;
    otp
}

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

pub async fn verify(client: State<Client>, Json(req) : Json<RegisterRequest>) -> (StatusCode, Json<String>) {
    let collection: Collection<UserSchema> = client.database(DB_NAME).collection(COLLECTIONS_NAME);
    if req.otp {
        match collection.update_one(doc! { "username" : &req.username, "email" : &req.email },
            doc!{ "$set" : { "verified" : true }},
            None)
        .await {
            Ok(_) => {
                println!("updated:");
                return (StatusCode::OK, Json(String::from("User added and verified!!")));
            }            
            Err(err) => return (StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Couldn't update the verification: {}", err)))
        };
    } else {
        (StatusCode::NOT_FOUND, Json(String::from("The otp couldn't be verified")))
    }
}

pub async fn register(client: State<Client>, Json(req): Json<User>) -> Result<(StatusCode, Json<RegisterResponse>), Json<String>> {
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
       
    println!("otp {:?}", generate_otp());

    let otp = generate_otp();

    if !existing_user(&collection, &req).await.unwrap() {
        collection.insert_one(&new_user, None).await.unwrap();  
    }

    let (mail_status, _mail_message) = match existing_non_verified_user(&collection, &new_user).await {
        Ok(true) => SMTPMailSender::new(req.email.clone(), otp).send_verification_mail(&new_user).await,
        Ok(false) => (StatusCode::ALREADY_REPORTED, Json(String::from("User already verified"))),
        Err(err) => return Err(Json(format!("{:?}", err))),
    };

    println!("id: {:?}", new_user._id);
    println!("status: {}", mail_status);
   
    if mail_status == StatusCode::OK {
        Ok((StatusCode::OK, Json(RegisterResponse::new(req.username.clone(), req.email.clone(), otp))))


    } else {
        return Err(Json(String::from("Error occured while sending email")));
    }
}