use axum::extract::State;
use axum::{debug_handler, extract::Request, middleware::Next, response::IntoResponse, Json};
use http::{header, StatusCode};
use jsonwebtoken::{decode, DecodingKey, Validation};
use mongodb::bson::doc;
use mongodb::{Client, Collection};
use crate::auth::login::{Claims, Keys};
use crate::models::user::UserSchema;
use dotenv::dotenv;

#[debug_handler()]
pub async fn authenticate_customer(Json(_req): Json<String>) -> StatusCode {
    StatusCode::OK
}

pub async fn authenticate_jwt(client: State<Client>, mut req: Request, next: Next) ->Result<impl IntoResponse, (StatusCode, Json<String>)> {
    let collection: Collection<UserSchema> = client.database("StuddyBuddy").collection("Users");
    dotenv().unwrap();
    let secret = std::env::var("JWT_SECRET").expect("JWT SECRET must be set!");   
    let bearer = req.headers()
        .get(header::AUTHORIZATION)
        .and_then(|auth_header| auth_header.to_str().ok())
        .and_then(|auth_value| {
            if auth_value.starts_with("Bearer ") {
                Some(&auth_value[7..])
            } else {
                None
            }
        });

    let bearer = if bearer.is_some() {
        bearer.unwrap()
    } else {
        return Err((StatusCode::UNAUTHORIZED, Json(String::from("Couldn't find the JWT token in the AUTHORIZATION header"))));
    };
 
    println!("bearer, {:?}", bearer);
    let claims = decode::<Claims>(bearer, &DecodingKey::from_secret(secret.as_ref()), &Validation::default()).unwrap().claims;
 
    println!("token {:?}", claims.id);
    println!("token {:?}", claims.username);
    
    let user = match collection.find_one(doc! { "_id" : claims.id }, None).await {
        Ok(Some(user)) => Some(user),
        Ok(None) => None,
        Err(err) => return Err((StatusCode::INTERNAL_SERVER_ERROR, Json(format!("User couldn't be found {:?}", err))))
    };

    req.extensions_mut().insert(user);

    Ok(next.run(req).await)
}
