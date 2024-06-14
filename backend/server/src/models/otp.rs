use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct RegisterResponse {
    pub username: String,
    pub email: String,
    pub otp: u32
}

impl RegisterResponse {
    pub fn new(username: String, email: String, otp: u32) -> RegisterResponse {
        Self {
            username,
            email,
            otp
        }
    }
}

#[derive(Debug, Deserialize, Serialize)]
pub struct RegisterRequest {
    pub username: String,
    pub email: String,
    pub otp: bool
}
