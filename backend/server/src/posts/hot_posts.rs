use axum::{extract::State, Json};
use mongodb::{bson::{doc, Document}, options::AggregateOptions, Client, Collection};
use futures::stream::StreamExt;
use crate::models::community_post_schema::CommunityPostSchema;

const DB_NAME: &str = "StuddyBuddy";

#[derive(Debug)]
struct Grade {
    upvotes: Vec<u32>,
    downvotes: Vec<u32>,
}

impl Grade {
    fn new() -> Self {
        Self {
            upvotes: Vec::new(),
            downvotes: Vec::new(),
        }
    }

    fn update(&mut self, upvotes: u32, downvotes: u32) {
        self.upvotes.push(upvotes);
        self.downvotes.push(downvotes);
    }
}

pub async fn hot_posts(client: State<Client>) -> Result<Json<Vec<Document>>, Json<String>> {
    let collection: Collection<CommunityPostSchema> = client.database(DB_NAME).collection("Posts");

    let mut up_down_cursor = collection.find(None, None).await.unwrap();
    //println!("up_down {:?}", up_down_cursor);
    let mut grade = Grade::new();

    while let Some(post) = up_down_cursor.next().await {
        match post {
            Ok(doc) => {
                grade.update(doc.upvotes, doc.downvotes) 
            }
            Err(err) => return Err(Json(format!("Error: {:?}", err)))
        }
    }
    let pipeline = vec![
        doc! {
            "$project": {
                "user_id" : 1,
                "username" : 1,
                "upvotes" : 1,
                "downvotes" : 1,
                "subject" : 1,
                "post_content" : 1,
                "profile_pic" : 1,
                "comment" : 1,
                "votes": {
                    "$subtract": [ "$upvotes", "$downvotes" ]
                }
            }
        },
        doc! {
            "$sort" : { "votes" : -1 }
        },
        doc! {
            "$limit" : 10
        }
    ];    
    let options = AggregateOptions::builder().allow_disk_use(true).build();

    let mut data = collection.aggregate(pipeline, options).await.unwrap();
    let mut doc: Vec<Document> = Vec::new();

    while let Some(post) = data.next().await {
         doc.push(match post {
            Ok(doc) => doc,
            Err(err) => return Err(Json(format!("Error: {:?}", err)))
        });
    }

    println!("doc: {:?}", doc);

    Ok(Json(doc))
}
