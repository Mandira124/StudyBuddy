use http::Method;
use mongodb::Client;
use tokio::{net::TcpListener, sync::Mutex};
use axum::{ routing::get, Router};
use socketioxide::SocketIo;
use dotenv::dotenv;
use tower_http::cors::{Any, CorsLayer};
use anyhow::Context;
use crate::handler::on_connect;

mod handler;
mod state;

#[tokio::main]
async fn main() -> anyhow::Result<(), anyhow::Error> {
     dotenv().ok();
    let mongodb_uri = std::env::var("MONGODB_URI").unwrap();
    let client = Client::with_uri_str(mongodb_uri).await.context("Failed to connect to MongoDb")?;

    // The layer is used to establish a connection to engineio from socketio config
    let (layer, io) = SocketIo::builder()
        .with_state(client.clone())
        .build_layer();

    // connection
    io.ns("/", on_connect); 

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods([Method::GET, Method::POST]) 
        .allow_headers(Any);

    let app = Router::new()
        .route("/", get(|| async { "Hello, world" }))
        .with_state(client.clone())
        .layer(layer)
        .layer(cors);

    let listener = match TcpListener::bind("127.0.0.1:1973").await {
        Ok(listener) => listener,
        Err(err) => {
            eprintln!("Failed to bind tcp listener: {}", err);
            return Err(err.into());        } 
    };

    axum::serve(listener, app).await.unwrap();
    Ok(())
}

