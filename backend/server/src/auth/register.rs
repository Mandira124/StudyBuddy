use std::char;

use axum::{extract::State, http::StatusCode, Json};
use bcrypt::{hash, DEFAULT_COST};
use mongodb::{bson::doc, Client, Collection};
use rand::Rng;
use crate::models::user::{User, UserSchema};

const DB_NAME: &str = "StuddyBuddy";
const COLLECTIONS_NAME: &str = "Users";

async fn existing_user(collection: &Collection<UserSchema>, user: &User) -> Result<bool, String> {
    match collection.find_one(doc! { "username": &user.username, "email" : &user.email, "verified" : false }, None).await {
        Ok(Some(_)) => Ok(true),
        Ok(None) => Ok(false),
        Err(err) => Err(err.to_string())
    }
}

async fn existing_verified_user(collection: &Collection<UserSchema>, user: &User) -> Result<bool, String> {
    match collection.find_one(doc! { "username": &user.username, "email" : &user.email, "verified" : true }, None).await {
        Ok(Some(_)) => Ok(true),
        Ok(None) => Ok(false),
        Err(err) => Err(err.to_string())
    }
}

pub async fn register(client: State<Client>, Json(req): Json<User>) -> (StatusCode, Json<String>) {
    let collection: Collection<UserSchema> = client.database(DB_NAME).collection(COLLECTIONS_NAME);
    //user.password = hash(user.password, DEFAULT_COST).unwrap();
    let verification_token: String = rand::thread_rng()
        .sample_iter(&rand::distributions::Uniform::new(char::from(32), char::from(126)))
        .take(20)
        .map(char::from)
        .collect();

    println!("verification_token: {:?}", verification_token);
    

    let new_user = UserSchema {
        username: req.username.clone(),
        email: req.email.clone(),
        phone_no: req.phone_no.clone(),
        password: hash(req.password.clone(), DEFAULT_COST).unwrap(),
        verified: false,
        verification_token,
    };
    
    match existing_user(&collection, &req).await {
        Ok(false) => {
            match collection.insert_one(new_user.clone(), None).await {
                Ok(_) => (StatusCode::CREATED, Json("User created".to_string())),
                Err(_) => (StatusCode::INTERNAL_SERVER_ERROR, Json("User couldn't be inserted".to_string()))
            }
        },
        Ok(true) => (StatusCode::IM_USED, Json("User already exists".to_string())),
        Err(err) => (StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Unexpected error occured!, {:?}", err)))
    }
}
