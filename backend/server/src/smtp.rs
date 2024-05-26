use std::env;

use axum::{extract::State, http::StatusCode, Json};
use dotenv::dotenv;
use mail_send::mail_builder::MessageBuilder;
use mongodb::Client;
use crate::models::user::UserSchema;

pub struct SMTPMailSender {
    pub smtp_server: String,
    pub smtp_port: u16,
    pub sender_email: String,
    pub sender_password: String,
    pub receiver_email: String,
}

impl SMTPMailSender {
    pub fn new(receiver_email: String) -> Self {
        dotenv().ok();
        let sender_email = std::env::var("EMAIL_ADDRESS").unwrap();
        let sender_password = std::env::var("EMAIL_PASSWORD").unwrap();
    
        SMTPMailSender {
            smtp_server: String::from("smtp.gmail.com"),
            smtp_port: 587,
            sender_email,
            sender_password,
            receiver_email
        }
    }  

    pub async fn send_verification_mail(&self, client: State<Client>, user: &UserSchema) -> (StatusCode, Json<String>) {
        dotenv().ok();   
        let verification_link = format!("http://localhost:5173/api/users/verify?token={}", user.verification_token);
        let message = MessageBuilder::new()
            .from(("StudyBuddy", self.sender_email.as_str()))
            .to(self.receiver_email.as_str())
            .subject("Verification Email")
            .text_body(format!("Dear {},

Thank you for signing up with [Your Company/Website Name].

Please verify your email address by clicking the link below:

{}

If you did not sign up for this account, please ignore this email.

Best regards,
StudyBuddy",
user.username, verification_link
));

        (StatusCode::OK, Json(format!("hello")))
    }
}
