use serde::Deserialize;

#[derive(Deserialize)]
pub struct User {
    pub username: String,
    pub email: String,
    pub phone_no: Option<String>,
    pub password: String,
}
