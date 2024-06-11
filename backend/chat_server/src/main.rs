use std::sync::{Arc, RwLock};

use http::Method;
use mongodb::{bson::{doc, to_bson}, Client, Collection};
use state::{UserSchema, Session, Message, MessageSession};
use tokio::{net::TcpListener, sync::Mutex};
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
    let msg_coll = Arc::new(Mutex::new(message_collection));
    let binding_message = msg_coll.clone();
    let binding1_join = msg_coll.clone();

    // connection
    io.ns("/", |socket: SocketRef| {
        
        socket.on("message", |socket: SocketRef, Data(session): Data<Session>| async move {
            let sender_username = session.sender_username.clone();
            let receiver_username = session.receiver_username.clone();
            let message = session.message.clone();
            let sender_id = collection.find_one(doc! { "username" : &sender_username.clone() }, None).await.unwrap();
            let receiver_id = collection.find_one(doc! { "username" : &receiver_username.clone() }, None).await.unwrap();
            println!("room {:?}", &session.room_id);
            println!("receiver_id :{:?} sender_id {:?}",sender_id, receiver_id); 
            println!("socket_id {:?}", socket);
            println!("susername: {:?}, rusername: {:?}, message received {:?}", sender_username, receiver_username, message);

            let message = Message {
                sender_username: session.sender_username.clone(),
                receiver_username: session.receiver_username.clone(),
                message: session.message.clone()
            };
            
            let message_bson = to_bson(&message).unwrap();

            let mut message_session = MessageSession {
                messages: Vec::new(), 
                room_id: session.room_id.clone(),
            };
           
            let read_coll = binding_message.lock().await;
            let match_message_session = match read_coll.find_one(doc! { "room_id" : session.room_id.clone() }, None).await {
                Ok(Some(message_session)) => Some(message_session),
                Ok(None) => None,
                Err(err) => {
                    panic!("Error while searching for room: {:?}", err);
                }
            };
             
            if let Some(message_session) = match_message_session {
                read_coll.update_one(doc! { "room_id" : message_session.room_id }, doc! { "$push" : { "messages" : message_bson } }, None).await.unwrap();
            } else {
                message_session.messages.push(message.clone());
                read_coll.insert_one(&message_session, None).await.unwrap();
            }
        
            println!("\n\nEmitting message: {:?}\n\n", message);
            socket.emit("messageemit", message).unwrap();
        });  
        
        socket.on("join", |socket: SocketRef, Data::<String>(room_id)| async move {
            println!("calledddd joinnnn");
            let read_coll = binding1_join.lock().await;
            let _ = socket.leave_all();
            let _ = socket.join(room_id.clone());
            let messages = match read_coll.find_one(doc! { "room_id" : room_id.clone() }, None).await {
                Ok(Some(message)) => Some(message),
                Ok(None) => None,
                Err(err) => panic!("Error occured: {:?}", err)
            }.expect("Error occured while reading the messages");
            println!("Emitting messages : {:?}", messages);
            let _ = socket.emit("messages", messages);
        });
        socket.on("message", |socket: SocketRef, Data(session): Data<Session>| async move {
            let sender_username = session.sender_username.clone();
            let receiver_username = session.receiver_username.clone();
            let message = session.message.clone();
            let sender_id = collection.find_one(doc! { "username" : &sender_username.clone() }, None).await.unwrap();
            let receiver_id = collection.find_one(doc! { "username" : &receiver_username.clone() }, None).await.unwrap();
            println!("room {:?}", &session.room_id);
            println!("receiver_id :{:?} sender_id {:?}",sender_id, receiver_id); 
            println!("socket_id {:?}", socket);
            println!("susername: {:?}, rusername: {:?}, message received {:?}", sender_username, receiver_username, message);

            let message = Message {
                sender_username: session.sender_username.clone(),
                receiver_username: session.receiver_username.clone(),
                message: session.message.clone()
            };
            
            let message_bson = to_bson(&message).unwrap();

            let mut message_session = MessageSession {
                messages: Vec::new(), 
                room_id: session.room_id.clone(),
            };
           
            let read_coll = binding_message.lock().await;
            let match_message_session = match read_coll.find_one(doc! { "room_id" : session.room_id.clone() }, None).await {
                Ok(Some(message_session)) => Some(message_session),
                Ok(None) => None,
                Err(err) => {
                    panic!("Error while searching for room: {:?}", err);
                }
            };
             
            if let Some(message_session) = match_message_session {
                read_coll.update_one(doc! { "room_id" : message_session.room_id }, doc! { "$push" : { "messages" : message_bson } }, None).await.unwrap();
            } else {
                message_session.messages.push(message.clone());
                read_coll.insert_one(&message_session, None).await.unwrap();
            }
        
            println!("\n\nEmitting message: {:?}\n\n", message);
            socket.emit("messageemit", message).unwrap();
        });  
        
        socket.on("join", |socket: SocketRef, Data::<String>(room_id)| async move {
            println!("calledddd joinnnn");
            let read_coll = binding1_join.lock().await;
            let _ = socket.leave_all();
            let _ = socket.join(room_id.clone());
            let messages = match read_coll.find_one(doc! { "room_id" : room_id.clone() }, None).await {
                Ok(Some(message)) => Some(message),
                Ok(None) => None,
                Err(err) => panic!("Error occured: {:?}", err)
            }.expect("Error occured while reading the messages");
            println!("Emitting messages : {:?}", messages);
            let _ = socket.emit("messages", messages);
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

