use axum::{debug_handler, extract::Request, middleware::Next, response::IntoResponse, Json};
use http::StatusCode;
use jsonwebtoken::{decode, Validation};
use crate::auth::login::{Claims, Keys};
use crate::models::login_user::LoginUser;
use dotenv::dotenv;

#[debug_handler()]
pub async fn authenticate_customer(Json(_req): Json<LoginUser>) -> StatusCode {
    StatusCode::OK
}

pub async fn authenticate_jwt(req: Request, next: Next) ->Result<impl IntoResponse, (StatusCode, String)> {
    let (parts, body) = req.into_parts();
    dotenv().unwrap();
    let secret = std::env::var("JWT_SECRET").expect("JWT SECRET must be set!");
    let key = Keys::new(secret.as_bytes());

    // println!("bearer: {:?}", parts.headers["authorization"]);
    let bearer = &parts.headers["authorization"].to_str().unwrap().to_owned();
    let token = decode::<Claims>(bearer, &key.decoding, &Validation::default()).unwrap();
    println!("token {:?}", token);

    Ok((StatusCode::OK, "Hello".to_string()).into_response())
}
