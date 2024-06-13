use axum::response::{IntoResponse, Response};
use http::StatusCode;

#[derive(Debug)]
pub struct JWTError(anyhow::Error);

impl IntoResponse for JWTError {
    fn into_response(self) -> Response {
        (
            StatusCode::UNAUTHORIZED,
            format!("Something went wrong: {:?}", self)
        ).into_response()
    }
} 

impl<E> From<E> for JWTError
where 
    E: Into<anyhow::Error>
{
    fn from(value: E) -> Self {
        Self(value.into())
    }
}
