use http::Method;
use mongodb::Client; 
use router::create_router;
use tokio::net::TcpListener;
use dotenv::dotenv;
use tower_http::cors::{Any, CorsLayer};

mod auth;
mod chat;
pub mod community_post;
mod models;
mod response;
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

    let cors = CorsLayer::new()
        .allow_methods([Method::GET, Method::POST])
        .allow_origin(Any)
        .allow_headers(Any);

    let app = create_router(client); 

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
