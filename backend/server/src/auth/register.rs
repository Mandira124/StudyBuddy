use axum::{extract::State, http::StatusCode, Json};
use bcrypt::{hash, DEFAULT_COST};
use mongodb::{bson::doc, Client, Collection};
use crate::models::user::UserSchema;

async fn existing_user(collection: &Collection<UserSchema>, user: &UserSchema) -> Result<bool, String> {
    match collection.find_one(doc! { "email" : &user.email }, None).await {
        Ok(Some(_)) => Ok(true),
        Ok(None) => Ok(false),
        Err(err) => Err(err.to_string())
    }
}

pub async fn register(client: State<Client>, Json(mut user): Json<UserSchema>) -> (StatusCode, Json<String>) {
    let collection: Collection<UserSchema> = client.database("StuddyBuddy").collection("Users");
    user.password = hash(user.password, DEFAULT_COST).unwrap();
    
    match existing_user(&collection, &user).await {
        Ok(false) => {
            match collection.insert_one(user.clone(), None).await {
                Ok(_) => (StatusCode::CREATED, Json("User created".to_string())),
                Err(_) => (StatusCode::INTERNAL_SERVER_ERROR, Json("User couldn't be inserted".to_string()))
            }
        },
        Ok(true) => (StatusCode::IM_USED, Json("User already exists".to_string())),
        Err(err) => (StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Unexpected error occured!, {:?}", err)))
    }
}
