use axum::{http::StatusCode, Json};
use dotenv::dotenv;
use mail_send::{mail_builder::MessageBuilder, SmtpClientBuilder};
use crate::models::user::UserSchema;

pub struct SMTPMailSender {
    pub smtp_server: String,
    pub smtp_port: u16,
    pub sender_email: String,
    pub sender_password: String,
    pub receiver_email: String,
    pub otp: u32,
}

impl SMTPMailSender {
    pub fn new(receiver_email: String, otp: u32) -> Self {
        dotenv().ok();
        let sender_email = std::env::var("EMAIL_ADDRESS").unwrap();
        let sender_password = std::env::var("EMAIL_PASSWORD").unwrap();
   
        SMTPMailSender {
            smtp_server: String::from("smtp.gmail.com"),
            smtp_port: 587,
            sender_email,
            sender_password,
            receiver_email,
            otp
        }
    }  

    pub async fn send_verification_mail(&self, user: &UserSchema) -> (StatusCode, Json<String>) {
        dotenv().ok();  
        let verification_link = String::from("http://localhost:5173/api/users/verify");
        let message = MessageBuilder::new()
            .from(("StudyBuddy", self.sender_email.as_str()))
            .to(self.receiver_email.as_str())
            .subject("Verification Email")
            .text_body(format!("Dear {},

Thank you for signing up with StudyBuddy.

Please verify your email address by clicking the link below.

{}

YOur otp is: {}

If you did not sign up for this account, please ignore this email.

Best regards,
StudyBuddy",
user.username, verification_link, self.otp
));

        match SmtpClientBuilder::new(self.smtp_server.as_str(), self.smtp_port)
            // upgrade with STARTTLS
            .implicit_tls(false)
            .credentials(("sr03233022@student.ku.edu.np", self.sender_password.as_str()))
            .connect()
            .await
            .unwrap()
            .send(message)
            .await
        {
            Ok(()) => (StatusCode::OK, Json(format!("Verification mail sent successfully!"))),
            Err(err) => (StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Mail couldn't be sent: {:?}", err)))

        }

    }
}


