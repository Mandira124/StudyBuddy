use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct UserSchema {
    pub _id: ObjectId,
    pub username: String,
    pub email: String,
    pub phone_no: Option<String>,
    pub password: String,
    pub verified: bool,
    pub verification_token: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Session {
    pub sender_username: String,
    pub receiver_username: String,
    pub room_id: String,
    pub message: String,
}

