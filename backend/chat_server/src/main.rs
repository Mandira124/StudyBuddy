use http::Method;
use mongodb::{bson::doc, Client, Collection};
use store::{UserSchema, Session};
use tokio::net::TcpListener;
use axum::{routing::get, Router};
use socketioxide::{
    extract::{Data, SocketRef},
    SocketIo,
};
use dotenv::dotenv;
use tower_http::cors::{Any, CorsLayer};
use anyhow::Context;
use uuid::Uuid;

mod store;

#[tokio::main]
async fn main() -> anyhow::Result<(), anyhow::Error> {
    // The layer is used to establish a connection to engineio from socketio config
    let (layer, io) = SocketIo::new_layer();
    
    dotenv().ok();
    let mongodb_uri = std::env::var("MONGODB_URI").unwrap();
    let client = Client::with_uri_str(mongodb_uri).await.context("Failed to connect to MongoDb")?;
    let collection: Collection<UserSchema> = client.database("StudyBuddy").collection("Users");

    // connection
    io.ns("/", |socket: SocketRef| {
        socket.on("message", |socket: SocketRef, Data(session): Data<Session>| async move {
            let sender_username = session.sender_username;
            let receiver_username = session.receiver_username;
            let message = session.message;
            let sender_id = collection.find_one(doc! { "username" : sender_username.clone() }, None).await.unwrap();
            let receiver_id = collection.find_one(doc! { "username" : receiver_username.clone() }, None).await.unwrap();
            println!("room {:?}", &session.room_id);
            let room_id = Uuid::new_v5(&Uuid::NAMESPACE_URL, session.room_id.as_bytes()); 
            println!("Room id: {:?}", room_id);
            println!("receiver_id :{:?} sender_id {:?}",sender_id, receiver_id); 
            println!("socket_id {:?}", socket);
            println!("susername: {:?}, rusername: {:?}, message received {:?}", sender_username, receiver_username, message);
        }); 

        socket.on("disconnect",|_socket: SocketRef| {
            println!("Client Disconnected!");
        });
    });

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods([Method::GET, Method::POST]) 
        .allow_headers(Any);

    let app = Router::new()
        .route("/", get(|| async { "Hello, world" }))
        .with_state(client)
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

<<<<<<< HEAD
=======

>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2
