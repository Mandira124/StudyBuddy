use axum::{http::StatusCode, response::IntoResponse, Json};
use serde_json::json;

#[derive(Debug)]
enum AuthError {
    WrongCredentials,
    MissingCredentials,
    TokenCreation,
    InvalidToken,
}

impl IntoResponse for AuthError {
    fn into_response(self) -> axum::response::Response {
        let (status, error_message) =match self {
            AuthError::WrongCredentials => (StatusCode::UNAUTHORIZED, "Wrong Credentials!"),
            AuthError::MissingCredentials => (StatusCode::BAD_REQUEST, "Missing Credentials!"),
            AuthError::TokenCreation => (StatusCode::INTERNAL_SERVER_ERROR, "Token Creation Error!"),
            AuthError::InvalidToken => (StatusCode::BAD_REQUEST, "Invalid Token!")
        };

        let message = Json(json!({ "error" : error_message }));

        (status, message).into_response()
    }
}
