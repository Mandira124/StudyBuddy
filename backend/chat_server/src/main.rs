use std::collections::HashMap;

use http::Method;
use mongodb::{bson::{doc, to_bson, to_document, Document}, Client, Collection};
use state::{MessageSession, Session, UserSchema, Message};
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

mod state;

#[tokio::main]
async fn main() -> anyhow::Result<(), anyhow::Error> {
    // The layer is used to establish a connection to engineio from socketio config
    let (layer, io) = SocketIo::new_layer();
    
    dotenv().ok();
    let mongodb_uri = std::env::var("MONGODB_URI").unwrap();
    let client = Client::with_uri_str(mongodb_uri).await.context("Failed to connect to MongoDb")?;
    let collection: Collection<UserSchema> = client.database("StudyBuddy").collection("Users");
    let message_collection: Collection<MessageSession> = client.database("StudyBuddy").collection("Session");

    // connection
    io.ns("/", |socket: SocketRef| {
        socket.on("message", |socket: SocketRef, Data(session): Data<Session>| async move {
            let sender_username = session.sender_username;
            let receiver_username = session.receiver_username;
            let message = session.message;
            let sender_id = collection.find_one(doc! { "username" : &sender_username.clone() }, None).await.unwrap();
            let receiver_id = collection.find_one(doc! { "username" : &receiver_username.clone() }, None).await.unwrap();
            println!("room {:?}", &session.room_id);
            let room_id = Uuid::new_v5(&Uuid::NAMESPACE_URL, session.room_id.as_bytes()); 
            println!("Room id: {:?}", room_id);
            println!("receiver_id :{:?} sender_id {:?}",sender_id, receiver_id); 
            println!("socket_id {:?}", socket);
            println!("susername: {:?}, rusername: {:?}, message received {:?}", sender_username, receiver_username, message);

            let messagesss = Message {
                sender_username: session.sender_username,
                receiver_username: session.receiver_username,
                message: session.message
            };

            let n = Vec::new();
            n.push(messagesss);
            
            let mut room = match message_collection.find_one(doc! { "room_id" : &session.room_id }, None).await {
                Ok(room) => room,
                Ok(None) => None,
                Err(err) => {
                    panic!("Error while searching for room: {:?}", err); 
                }
            };

            let m: HashMap<String, Vec<Message>> =  HashMap::new();
            m.insert(session.room_id, n);

            let sessionnn = MessageSession {
                messages: m, 
            };

            let s = to_document(&sessionnn).unwrap();

            if room.is_none() {
                collection.insert_one(&s, None).await.unwrap();
            } 

            socket.to(session.room_id).emit("message-emit", message).unwrap();
        }); 

        socket.on("disconnect",|_socket: SocketRef| {
            println!("Client Disconnected!");
        });

        // socket.on("join", |socket: SocketRef|)
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


