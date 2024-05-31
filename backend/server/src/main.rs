use crate::auth::{login::login, register::register};
use axum::{routing::{get, post}, Router};
use mongodb::Client; 
use tokio::net::TcpListener;
use dotenv::dotenv;
use tower_http::cors::{Any, CorsLayer};
use http::{header::CONTENT_TYPE, Method};

mod auth;
mod models; 
mod smtp;

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
    
    let cors = CorsLayer::new()
        .allow_methods([Method::GET, Method::POST])
        .allow_origin(Any)
        .allow_headers([CONTENT_TYPE]);
    
    let app = Router::new()
        .route("/api/", get(index))
        .route("/api/register", post(register))
        .route("/api/login", post(login))
        .layer(cors)
        .with_state(client);

    let listener = TcpListener::bind("127.0.0.1:1991").await.unwrap();

    axum::serve(listener, app).await.unwrap();
}


