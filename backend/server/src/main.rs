use mongodb::Client; 
use router::create_router;
use crate::auth::login::login;
use crate::auth::register::register;
use auth::{auth_middleware::{authenticate_customer, authenticate_jwt}, register::verify};
use axum::{body::HttpBody, middleware, routing::{get, post}, Router};
use http::Method;
use socketioxide::{extract::SocketRef, SocketIo};
use tokio::net::TcpListener;
use dotenv::dotenv;
use tower_http::cors::{Any, CorsLayer};

mod auth;
mod chat;
pub mod posts;
mod models;
mod router;
mod smtp;

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
            eprintln!("Failed to read environment variable: {}", err);
            return;
        }
    };

    let app = create_router(client); 

    let listener = match TcpListener::bind("127.0.0.1:1991").await {
        Ok(listener) => listener,
        Err(err) => {
            eprintln!("Failed to bind tcp listener: {}", err);
            return;
        }
    };

    match axum::serve(listener, app).await {
        Ok(_) => println!("Server is set!"),
        Err(err) => eprintln!("Server error: {}", err)
    }
}