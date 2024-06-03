use crate::auth::{login::login, register::register};
use auth::login::{authenticate_customer, authenticate_jwt};
use axum::{middleware, routing::{get, post}, Router};
use http::{header::CONTENT_TYPE, Method};
use mongodb::Client; 
use tokio::net::TcpListener;
use dotenv::dotenv;
use tower_http::cors::{Any, CorsLayer};

mod auth;
mod auth_middleware;
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
        .nest("/", auth_jwt)
        .with_state(client)
        .layer(cors);

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


