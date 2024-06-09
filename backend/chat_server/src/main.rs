use http::Method;
use tokio::net::TcpListener;
use axum::{routing::get, Router};
use socketioxide::{
    extract::SocketRef,
    SocketIo,
};
use tower_http::cors::{Any, CorsLayer};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // The layer is used to establish a connection to engineio from socketio config
    let (layer, io) = SocketIo::new_layer();

    // connection
    io.ns("/", |socket: SocketRef| {
        socket.on("message", |socket: SocketRef| {
            println!("socket_id {:?}", socket);
            println!("message received");
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


