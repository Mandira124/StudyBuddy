use axum::{body::Body, extract::Json, response::{IntoResponse, Response}, routing::get, Router};
use mongodb::{Client, options::ClientOptions};
use tokio::net::TcpListener;
use models::user::User;

mod auth;
mod models;

// Json deserializes the request type into User type
async fn sabinonweb(Json(req): Json<User>) -> impl IntoResponse {
    req.username
}

async fn index() -> &'static str {
    "index".into()
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/sabinonweb", get(sabinonweb))
        .route("/", get(index));

    let listener = TcpListener::bind("127.0.0.1:8080").await.unwrap();

    axum::serve(listener, app).await.unwrap();
}


