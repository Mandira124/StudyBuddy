use axum::{middleware, routing::{get, post}, Router};
use http::Method;
use mongodb::Client;
use tower_http::cors::{Any, CorsLayer};

use crate::{auth::{auth_middleware::authenticate_jwt, login::login, register::{register, verify}}, posts::{comment::comment_update, downvote::downvote_update, hot_posts::hot_posts, most_liked::most_liked, post::posts_update, trending_posts::trending_posts, upvote::upvote_update}};

pub fn create_router(client: Client) -> Router {
     let cors = CorsLayer::new()
        .allow_methods([Method::GET, Method::POST])
        .allow_origin(Any)
        .allow_headers(Any);

   
    let auth_jwt = Router::new()
        .route("/posts", post(posts_update))
        .route("/retrieve_hot_posts", get(hot_posts))
        .route("/trending", get(trending_posts))
        .route("/most_liked", get(most_liked))
        .route("/upvote", post(upvote_update))
        .route("/downvote", post(downvote_update))
        .route("/comment", post(comment_update))
        .layer(middleware::from_fn_with_state(client.clone(), authenticate_jwt));


    Router::new()
        .route("/register", post(register))
        .route("/verify", post(verify))
        .route("/login", post(login))
        .nest("/", auth_jwt)
        .with_state(client.clone())
        .layer(cors)
}
