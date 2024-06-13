use mongodb::{bson::{doc, to_bson}, Client, Collection};
use socketioxide::extract::{AckSender, Data, SocketRef, State};
use crate::state::{Message, MessageSession, Session, UserSchema};

pub async fn on_connect(socket: SocketRef) {
    socket.on("join", |socket: SocketRef, Data::<String>(room_id), State(client) : State<Client>| async move {
        tokio::task::spawn(async move {
            join_handler(socket, Data(room_id), State(client)).await;
        });
    });


    socket.on("message", |socket: SocketRef, Data(session) : Data<Session>, State(client) : State<Client>| {
        tokio::task::spawn(async move {
            message_handler(socket, Data(session), State(client)).await;
        });
    });
}

pub async fn join_handler(socket: SocketRef, Data(room_id): Data<String>, State(client) : State<Client>) {
               println!("calledddd joinnnn");
            
            let collection: Collection<MessageSession> = client.database("StudyBuddy").collection("Session");
            let _ = socket.leave_all();
            let _ = socket.join(room_id.clone());
            let messages = match collection.find_one(doc! { "room_id" : room_id.clone() }, None).await {
                Ok(Some(message)) => Some(message),
                Ok(None) => None,
                Err(err) => panic!("Error occured: {:?}", err)
            }.expect("Error occured while reading the messages");
            println!("Emitting messages : {:?}", messages);
            socket.emit("messages", messages).unwrap();
        

}

pub async fn message_handler(socket: SocketRef, Data(session) : Data<Session>, State(client) : State<Client>) {
    println!("called");
    let collection: Collection<MessageSession> = client.database("StudyBuddy").collection("Session");
    let sender_username = session.sender_username.clone();
    let receiver_username = session.receiver_username.clone();
    let message = session.message.clone();
    
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
   
    let match_message_session = match collection.find_one(doc! { "room_id" : session.room_id.clone() }, None).await {
        Ok(Some(message_session)) => Some(message_session),
        Ok(None) => None,
        Err(err) => {
            panic!("Error while searching for room: {:?}", err);
        }
    };
     
    if let Some(message_session) = match_message_session {
        collection.update_one(doc! { "room_id" : message_session.room_id }, doc! { "$push" : { "messages" : message_bson } }, None).await.unwrap();
    } else {
        message_session.messages.push(message.clone());
        collection.insert_one(&message_session, None).await.unwrap();
    }

    println!("Emitting message from message: {:?}", message);
    socket.within(session.room_id).emit("room-message", message).unwrap();
}


