use axum::{middleware, routing::{get, post}, Router};
use http::Method;
use mongodb::Client;
use tower_http::cors::{Any, CorsLayer};

use crate::{auth::{auth_middleware::{authenticate_customer, authenticate_jwt}, login::login, register::{register, verify}}, community_post::{hot_posts, most_liked, posts, trending_posts}};

pub fn create_router(client: Client) -> Router {
     let cors = CorsLayer::new()
        .allow_methods([Method::GET, Method::POST])
        .allow_origin(Any)
        .allow_headers(Any);

   
    let auth_jwt = Router::new()
        .route("/posts", post(posts))
        .route("/retrieve_hot_posts", get(hot_posts))
        .route("/trending", get(trending_posts))
        .route("/most_liked", get(most_liked))
        .layer(middleware::from_fn_with_state(client.clone(), authenticate_jwt));


    Router::new()
        .route("/register", post(register))
        .route("/verify", post(verify))
        .route("/login", post(login))
        .nest("/", auth_jwt)
        .with_state(client.clone())
        .layer(cors)
}
