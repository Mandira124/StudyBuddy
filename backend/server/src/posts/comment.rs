use axum::{extract::State, Json};
use http::StatusCode;
use mongodb::{bson::{doc, to_document}, Client, Collection};

use crate::models::{community_post_schema::CommunityPostSchema, update::Comment};

pub async fn comment_update(client: State<Client>, Json(req): Json<Comment>) -> Result<Json<CommunityPostSchema>, (StatusCode, Json<String>)> {
    let collection: Collection<CommunityPostSchema> = client.database("StuddyBuddy").collection("Posts");

    let post = match collection.find_one(doc! { "username" : req.clone().username, "_id" : req.clone().post_id }, None).await {
        Ok(Some(post)) => post,
        Ok(None) => return Err((StatusCode::NOT_FOUND, Json(format!("Post with _id: {:?} not found!", req.post_id)))),
        Err(err) => return Err((StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Error while finding post with _id = {:?} : {:?}", req.post_id, err))))
    };

    let post_doc = to_document(&post).unwrap();

    match collection.update_one(post_doc, doc! { "$push" : { "comment" : req.comment} }, None).await {
        Ok(update_result) => {
            if update_result.modified_count > 0 {
                match collection.find_one(doc! { "username" : req.username, "_id" : req.post_id }, None).await {
                    Ok(Some(post)) => return Ok(Json(post)),
                    Ok(None) => return Err((StatusCode::NOT_FOUND, Json(format!("Post with _id: {:?} not found!", req.post_id)))),
                    Err(err) => return Err((StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Error while finding post with _id = {:?} : {:?}", req.post_id, err))))
                }
            } else {
                return Err((StatusCode::INTERNAL_SERVER_ERROR, Json(String::from("Post couldn't be updated!"))));
            }
        },
        Err(err) => return Err((StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Couldn't update the post: {:?}", err))))
    }
}
