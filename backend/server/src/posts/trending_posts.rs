use axum::{extract::State, Json};
use mongodb::{bson::doc, options::FindOptions, Client, Collection};
use futures::stream::StreamExt;
use crate::models::community_post_schema::CommunityPostSchema;

const DB_NAME: &str = "StuddyBuddy";

pub async fn trending_posts(client: State<Client>) -> Result<Json<Vec<CommunityPostSchema>>, Json<String>> {
    let collection: Collection<CommunityPostSchema> = client.database(DB_NAME).collection("Posts");

    let find_options = FindOptions::builder()
        .sort(doc! { "upvotes" : -1, "downvotes" : -1})
        .limit(10)
        .build();

    let mut cursor = collection.find(None, find_options)
        .await
        .unwrap();

    let mut posts: Vec<CommunityPostSchema> = Vec::new();

    while let Some(post) = cursor.next().await {
        posts.push(post.unwrap());
    }

    Ok(Json(posts))
}
