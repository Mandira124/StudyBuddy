<<<<<<< HEAD
use std::time::{SystemTime, UNIX_EPOCH};

=======
>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2
use axum::{debug_handler, extract::{Request, State}, http::{request::Parts, StatusCode}, middleware::Next, response::IntoResponse, Json, RequestExt, RequestPartsExt};
use axum_extra::{headers::{authorization::Bearer, Authorization}, TypedHeader};
use bcrypt::verify;
use dotenv::dotenv;
use jsonwebtoken::{encode, DecodingKey, EncodingKey, Header};
<<<<<<< HEAD
use mongodb::{bson::{doc, oid::ObjectId}, Client, Collection};
=======
use mongodb::{bson::doc, Client, Collection};
>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2
use serde::{Deserialize, Serialize};
use crate::models::{login_user::LoginUser, user::UserSchema};

#[derive(Debug, Serialize)]
pub struct AuthBody {
<<<<<<< HEAD
    id: ObjectId,
    username: String,
=======
>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2
    access_token: String,
    token_type: String,
}

impl AuthBody {
<<<<<<< HEAD
    pub fn new(access_token: String, token_type: String, username: String, id: ObjectId) -> Self {
        AuthBody {
            id,
            username,
=======
    pub fn new(access_token: String, token_type: String) -> Self {
        AuthBody {
>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2
            access_token,
            token_type,
        }
    }
}

pub struct Keys {
    pub encoding: EncodingKey,
    pub decoding: DecodingKey,
}

impl Keys {
    pub fn new(secret: &[u8]) -> Self {
        Self {
            encoding: EncodingKey::from_secret(secret),
            decoding: DecodingKey::from_secret(secret),
        }
    }
}

<<<<<<< HEAD
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Claims {
    pub id: String,
    pub username: String,
    pub exp: u32,
=======
#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    pub id: String,
    pub username: String,
    pub exp: usize,
>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2
}

const DB_NAME: &str = "StuddyBuddy";
const COLLECTIONS_NAME: &str = "Users";

#[debug_handler]
pub async fn login(client: State<Client>, Json(req): Json<LoginUser>) -> Result<Json<AuthBody>, (StatusCode, Json<String>)> {
    let collections: Collection<UserSchema> = client.database(DB_NAME).collection(COLLECTIONS_NAME);

    dotenv().unwrap();
    let secret = std::env::var("JWT_SECRET").expect("JWT SECRET must be set!");
    let key = Keys::new(secret.as_bytes());
       
    let user = match collections.find_one(doc! { "email": &req.email }, None).await {
        Ok(Some(user)) => user,
        Ok(None) => return Err((StatusCode::NOT_FOUND, Json(format!("User not found, please register first!")))),
        Err(err) => return Err((StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Unexpected error occured: {:?}", err)))),
    };
   
    let (pass_status, pass_msg) = match verify(&req.password, &user.password[..]) {
        Ok(true) => (StatusCode::OK, Json(format!("User recognized!"))),
        Ok(false) => (StatusCode::NOT_FOUND, Json(format!("User not recognized!"))),
        Err(err) => (StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Unexpected error occured: {:?}", err)))
    };
<<<<<<< HEAD

    let now = SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs() as u32;
    let exp = now + (10 * 365 * 24 * 60 * 60);
    
    if pass_status == StatusCode::OK {
        let claims = Claims {
            id: user._id.to_hex(),
            username: user.clone().username,
            exp,
=======
   
    if pass_status == StatusCode::OK {
        let claims = Claims {
            id: user._id.to_hex(),
            username: user.username,
            exp: 1200,
>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2
        };
         
        // Header::default() use HS256 -> HMAC using SHA256 as a hash function/algorithm
        let token = encode(&Header::default(), &claims, &key.encoding).unwrap();
        println!("token: {:?}", token);

<<<<<<< HEAD
       Ok(Json(AuthBody::new(token, "Bearer".to_string(), user.clone().username, user._id))) 
=======
       Ok(Json(AuthBody::new(token, "Bearer".to_string())))
>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2

    } else {
        return Err((pass_status, pass_msg))
    }    
}


<<<<<<< HEAD
=======
pub async fn authenticate_jwt(req: Request, next: Next) ->Result<impl IntoResponse, (StatusCode, String)> {
    let (parts, body) = req.into_parts();
    // println!("bearer: {:?}", parts.headers["authorization"]);
    let bearer = &parts.headers["authorization"].to_str().unwrap();
   

    Ok((StatusCode::OK, "Hello".to_string()).into_response())
}
>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2
