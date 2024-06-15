use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};

#[derive(Clone, Deserialize, Serialize)]
pub struct Upvote {
    pub post_id: ObjectId,
    pub user_id: ObjectId,
    pub username: String,
    pub upvotes: u32,
}

#[derive(Clone, Deserialize, Serialize)]
pub struct Downvote {
    pub post_id: ObjectId,
    pub user_id: ObjectId,
    pub username: String,
    pub downvotes: u32,
}

#[derive(Clone, Deserialize, Serialize)]
pub struct Comment {
    pub post_id: ObjectId,
    pub user_id: ObjectId,
    pub username: String,
    pub comment: String,
}
