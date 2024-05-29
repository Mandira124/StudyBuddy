use axum::{extract::State, http::StatusCode, response::IntoResponse, Json};
use bcrypt::verify;
use mongodb::{bson::doc, Client, Collection};
use crate::models::{login_user::LoginUser, user::UserSchema};

#[derive(Debug)]
enum AuthError {
    WrongCredentials,
    MissingCredentials,
    TokenCreation,
    InvalidToken,
}

#[derive(Debug)]
struct Claims {
    id: String,
    username: String,
    exp: usize,
}

// impl IntoResponse for AuthError {
//     fn into_response(self) -> axum::response::Response {
//             let (status, error_message) = match self {
//             AuthError::WrongCredentials => (StatusCode::UNAUTHORIZED, "Wrong Credentials!"),
//             AuthError::MissingCredentials => (StatusCode::BAD_REQUEST, "Missing Credentials!"),
//             AuthError::TokenCreation => (StatusCode::INTERNAL_SERVER_ERROR, "Token Creation Error!"),
//             AuthError::InvalidToken => (StatusCode::BAD_REQUEST, "Invalid Token!")
//         };
//
//         let message = Json(json!({ "error" : error_message }));
//
//         (status, message).into_response()
//     }
// }

const DB_NAME: &str = "StuddyBuddy";
const COLLECTIONS_NAME: &str = "Users";

pub async fn login(client: State<Client>, Json(req): Json<LoginUser>) -> (StatusCode, Json<String>) {
    let collections: Collection<UserSchema> = client.database(DB_NAME).collection(COLLECTIONS_NAME);
    
    let user = match collections.find_one(doc! { "email": &req.email }, None).await {
        Ok(Some(user)) => user,
        Ok(None) => return (StatusCode::NOT_FOUND, Json(format!("User not found, please register first!"))),
        Err(err) => return (StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Unexpected error occured: {:?}", err))),
    };
    
    let (pass_status, pass_msg) = match verify(&req.password, &user.password[..]) {
        Ok(true) => (StatusCode::OK, Json(format!("User recognized!"))),
        Ok(false) => (StatusCode::NOT_FOUND, Json(format!("User not recognized!"))),
        Err(err) => (StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Unexpected error occured: {:?}", err)))
    };
    
    if pass_status == StatusCode::OK {
        let claims = Claims {
            id: user._id.to_hex(),
            username: user.username,
            exp: 1200,
        };
    } else {
        return (pass_status, pass_msg)
    }
    
    (StatusCode::OK, Json(String::new()))
}
