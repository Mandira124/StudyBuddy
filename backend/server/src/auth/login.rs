use axum::{extract::State, http::StatusCode, Json};
use bcrypt::verify;
use mongodb::{bson::doc, Client, Collection};
use crate::models::{login_user::LoginUser, user::UserSchema};

struct Claims {
    id: String,
}

const DB_NAME: &str = "StuddyBuddy";
const COLLECTIONS_NAME: &str = "Users";

pub async fn login(client: State<Client>, Json(req): Json<LoginUser>) -> (StatusCode, Json<String>) {
    let collections: Collection<UserSchema> = client.database(DB_NAME).collection(COLLECTIONS_NAME);
    
    let user = match collections.find_one(doc! { "email": &req.email }, None).await {
        Ok(Some(user)) => user,
        Ok(None) => return (StatusCode::NOT_FOUND, Json(format!("User not found, please register first"))),
        Err(err) => return (StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Unexpected error occured: {:?}", err))),
    };
    
    match verify(&req.password, &user.password[..]) {
        Ok(true) => return (StatusCode::OK, Json(format!("User recognized!"))),
        Ok(false) => return (StatusCode::NOT_FOUND, Json(format!("User not recognized!"))),
        Err(err) => return (StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Unexpected error occured: {:?}", err)))
    }
}
