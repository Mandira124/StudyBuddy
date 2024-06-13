use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct RegisterResponse {
    pub username: String,
<<<<<<< HEAD
    pub email: String, 
=======
    pub email: String,
>>>>>>> 914a5dc814b1ba613e82da298bd8992809a85708
    pub otp: u32
}

impl RegisterResponse {
    pub fn new(username: String, email: String, otp: u32) -> RegisterResponse {
        Self {
<<<<<<< HEAD
            username, 
=======
            username,
>>>>>>> 914a5dc814b1ba613e82da298bd8992809a85708
            email,
            otp
        }
    }
}


#[derive(Debug, Deserialize, Serialize)]
pub struct RegisterRequest {
    pub username: String,
<<<<<<< HEAD
    pub email: String, 
    pub otp: bool
}

=======
    pub email: String,
    pub otp: bool
}
>>>>>>> 914a5dc814b1ba613e82da298bd8992809a85708
