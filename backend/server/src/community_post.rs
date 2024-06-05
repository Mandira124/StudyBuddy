use axum::{extract::State, Json};
use http::StatusCode;
use mongodb::{bson::doc, Client, Collection};

use crate::models::{community_post_schema::CommunityPostSchema, user::UserSchema};

const DB_NAME: &str = "StuddyBuddy";
const USER_COLLECTIONS_NAME: &str = "Users";
const POST_COLLECTIONS_NAME: &str = "CommunityPost";

pub async fn community_post(client: State<Client>, Json(post): Json<CommunityPostSchema>) -> (StatusCode, Json<String>) {  
    let collection: Collection<UserSchema> = client.database(DB_NAME).collection(USER_COLLECTIONS_NAME);

    let user = match collection.find_one(doc! { "username": &post.username }, None).await {
        Ok(Some(user)) => user,
        Ok(None) => return (StatusCode::NOT_FOUND, Json(String::from("Username not found!"))),
        Err(err) => return (StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Error occured: {:?}", err.to_string())))
    };

    let new_post = CommunityPostSchema {
       _id: Some(user._id),
        ..post
    };

    let post_collection = client.database(DB_NAME).collection(POST_COLLECTIONS_NAME);

    if user.verified {
       post_collection.insert_one(new_post, None).await.unwrap(); 
    }

    (StatusCode::OK, Json(String::new()))
}
