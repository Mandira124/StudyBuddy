use mongodb::bson::{oid::ObjectId, Uuid};
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

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct User {
    pub username: String,
    pub email: String,
    pub phone_no: Option<String>,
    pub password: String,
}
