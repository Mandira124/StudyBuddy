use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct UserSchema {
    pub username: String,
    pub email: String,
    pub phone_no: Option<String>,
    pub password: String,
}
