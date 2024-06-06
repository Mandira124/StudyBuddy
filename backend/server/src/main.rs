use crate::auth::{login::login, register::register};
use auth::login::{authenticate_customer, authenticate_jwt};
use axum::{middleware, routing::{get, post}, Router};
use community_post::{community_post, hot_posts};
use http::{header::CONTENT_TYPE, Method};
use mongodb::Client; 
use tokio::net::TcpListener;
use dotenv::dotenv;
use tower_http::cors::{Any, CorsLayer};

mod auth;
mod auth_middleware;
mod chat;
mod community_post;
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
        .route("/cp", post(community_post))
        .route("/retrieve_hot_posts", get(hot_posts))
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






// use axum::routing::get;
// use serde_json::Value;
// use socketioxide::{
//     extract::{AckSender, Bin, Data, SocketRef},
//     SocketIo,
// };
//
// fn on_connect(socket: SocketRef, Data(data): Data<Value>) {
//     println!("socket io connected: {:?} {:?}", socket.ns(), socket.id);
//
//     socket.on(
//         "message",
//         |socket: SocketRef, Data::<Value>(data), Bin(bin)| {
//             println!("received event: {:?} {:?}", data, bin);
//             socket.bin(bin).emit("message-back", data).ok();
//         }
//     );
//
//     socket.on(
//         "message-with-ack",
//         |Data::<Value>(data), ack: AckSender, Bin(bin)| {
//             println!("received event: {:?} {:?}", data, bin);
//             ack.bin(bin).send(data).ok();
//         }
//     );
// }
//
// #[tokio::main]
// async fn main() -> Result<(), Box<dyn std::error::Error>> {
//     let (layer, io) = SocketIo::new_layer();
//
//     io.ns("/", on_connect);
//     io.ns("/custom", on_connect);
//
//     let app = axum::Router::new()
//     .route("/", get(|| async { "Hello, World!" }))
//     .layer(layer);
//
//     let listener = tokio::net::TcpListener::bind("127.0.0.1:1873").await.unwrap();
//     axum::serve(listener, app).await.unwrap();
//
//     Ok(())
// }
