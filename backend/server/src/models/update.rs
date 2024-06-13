use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct Upvote {
    pub post_id: ObjectId,
    pub user_id: ObjectId,
    pub username: String,
    pub upvotes: u32,
}
