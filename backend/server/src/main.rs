use crate::auth::{login::login, register::register};
use auth::{auth_middleware::authenticate_customer, login::authenticate_jwt};
use axum::{body::HttpBody, middleware, routing::{get, post}, Router};
use community_post::{hot_posts, most_liked, posts, trending_posts};
use http::Method;
use mongodb::Client; 
use socketioxide::{extract::SocketRef, SocketIo};
use tokio::net::TcpListener;
use dotenv::dotenv;
use tower_http::cors::{Any, CorsLayer};

mod auth;
mod chat;
pub mod community_post;
mod models; 
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

    let cors = CorsLayer::new()
        .allow_methods([Method::GET, Method::POST])
        .allow_origin(Any)
        .allow_headers(Any);

   
    let auth_jwt = Router::new()
        .route("/checksum", get(authenticate_customer))
        .layer(middleware::from_fn(authenticate_jwt));


    let app = Router::new()
        .route("/register", post(register))
        .route("/login", post(login))
        .route("/posts", post(posts))
        .route("/retrieve_hot_posts", get(hot_posts))
        .route("/trending", get(trending_posts))
        .route("/most_liked", get(most_liked))
        .nest("/", auth_jwt)
        .with_state(client)
        .layer(cors);

    let listener = match TcpListener::bind("0.0.0.0:1991").await {
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
