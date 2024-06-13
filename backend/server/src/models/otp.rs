use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct RegisterResponse {
    pub username: String,
    pub email: String,
<<<<<<< HEAD
    pub otp: u32,
=======
    pub otp: u32
>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2
}

impl RegisterResponse {
    pub fn new(username: String, email: String, otp: u32) -> RegisterResponse {
        Self {
            username,
            email,
<<<<<<< HEAD
            otp,
=======
            otp
>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2
        }
    }
}

<<<<<<< HEAD
=======

>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2
#[derive(Debug, Deserialize, Serialize)]
pub struct RegisterRequest {
    pub username: String,
    pub email: String,
<<<<<<< HEAD
    pub otp: bool,
=======
    pub otp: bool
>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2
}
