use crate::auth::register::register;
use axum::{body::Body, extract::Json, response::{IntoResponse, Response}, routing::{get, post}, Router};
use mongodb::{Client, options::ClientOptions};
use tokio::net::TcpListener;
use models::user::UserSchema;
use dotenv::dotenv;

mod auth;
mod models;

async fn index() -> &'static str {
    "index".into()
}

#[tokio::main]
async fn main() {
    dotenv().ok();
    let mongodb_uri = std::env::var("MONGODB_URI").unwrap();
    let client = match Client::with_uri_str(mongodb_uri).await {
        Ok(uri) => {
            //println!("uri {:?}", uri);
            uri
        } ,
        Err(err) => {
            // eprintln!("Failed to read environment variable: {}", err);
            return;
        }
    };
    
    let app = Router::new()
        .route("/", get(index))
        .route("/register", post(register))
        .with_state(client);

    let listener = TcpListener::bind("127.0.0.1:1991").await.unwrap();

    axum::serve(listener, app).await.unwrap();
}


