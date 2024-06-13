use std::sync::Arc;
use crate::handler::{join_handler, message_handler};
use http::Method;
use mongodb::{bson::{doc, to_bson}, Client, Collection};
use state::{UserSchema, Session, Message, MessageSession};
use tokio::{net::TcpListener, sync::Mutex};
use axum::{ routing::get, Router};
use socketioxide::{
    extract::{AckSender, Data, SocketRef, State},
    SocketIo,
};
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

       let collection: Collection<UserSchema> = client.database("StudyBuddy").collection("Users");
    let user_coll = Arc::new(Mutex::new(collection.clone()));
    let message_collection: Collection<MessageSession> = client.database("StudyBuddy").collection("Session");
    let msg_coll = Arc::new(Mutex::new(message_collection.clone()));
    let binding_message = msg_coll.clone();
    let binding_join = msg_coll.clone();

    // connection
    io.ns("/", on_connect);
        
        // socket.on("message", |socket: SocketRef, Data(session): Data<Session>| async move {
        //     println!("\n\n\nServer called\n\n\n");
        //     let sender_username = session.sender_username.clone();
        //     let receiver_username = session.receiver_username.clone();
        //     let message = session.message.clone();
        //     let user_collection = user_coll.lock().await;
        //     let sender_id = user_collection.find_one(doc! {"username" : &sender_username.clone() }, None).await.unwrap();
        //     let receiver_id = user_collection.find_one(doc! { "username" : &receiver_username.clone() }, None).await.unwrap();
        //     println!("room {:?}", &session.room_id);
        //     println!("receiver_id :{:?} sender_id {:?}",sender_id, receiver_id); 
        //     println!("socket_id {:?}", socket);
        //     println!("susername: {:?}, rusername: {:?}, message received {:?}", sender_username, receiver_username, message);
        //
        //     let message = Message {
        //         sender_username: session.sender_username.clone(),
        //         receiver_username: session.receiver_username.clone(),
        //         message: session.message.clone()
        //     };
        //     
        //     let message_bson = to_bson(&message).unwrap();
        //
        //     let mut message_session = MessageSession {
        //         messages: Vec::new(), 
        //         room_id: session.room_id.clone(),
        //     };
        //    
        //     let read_coll = binding_message.lock().await;
        //     let match_message_session = match read_coll.find_one(doc! { "room_id" : session.room_id.clone() }, None).await {
        //         Ok(Some(message_session)) => Some(message_session),
        //         Ok(None) => None,
        //         Err(err) => {
        //             panic!("Error while searching for room: {:?}", err);
        //         }
        //     };
        //      
        //     if let Some(message_session) = match_message_session {
        //         read_coll.update_one(doc! { "room_id" : message_session.room_id }, doc! { "$push" : { "messages" : message_bson } }, None).await.unwrap();
        //     } else {
        //         message_session.messages.push(message.clone());
        //         read_coll.insert_one(&message_session, None).await.unwrap();
        //     }
        //
        //     println!("Emitting message from message: {:?}", message);
        //     socket.within(session.room_id).emit("room-message", message).unwrap();
        // });  
        //
        // socket.on("join", |socket: SocketRef, Data::<String>(room_id)| async move {
        //     println!("calledddd joinnnn");
        //     let read_coll = binding_join.lock().await;
        //     let _ = socket.leave_all();
        //     let _ = socket.join(room_id.clone());
        //     let messages = match read_coll.find_one(doc! { "room_id" : room_id.clone() }, None).await {
        //         Ok(Some(message)) => Some(message),
        //         Ok(None) => None,
        //         Err(err) => panic!("Error occured: {:?}", err)
        //     }.expect("Error occured while reading the messages");
        //     println!("Emitting messages : {:?}", messages);
        //  socket.emit("messages", messages).unwrap();
        // });
        //
        // socket.on("join", on_connect);
        // socket.on("messages", message_handler);
    // }); 

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

