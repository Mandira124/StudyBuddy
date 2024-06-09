use std::str::FromStr;

use axum::{debug_handler, extract::State, Json};
use http::{Response, StatusCode};
use mongodb::{bson::{doc, oid::ObjectId, to_bson, Document}, options::{AggregateOptions, FindOptions}, Client, Collection};
use futures::stream::StreamExt;
use crate::models::{community_post_schema::{CommunityPostSchema, CommunityPostsSchema}, user::UserSchema};

const DB_NAME: &str = "StuddyBuddy";
const USER_COLLECTIONS_NAME: &str = "Users";
const POST_COLLECTIONS_NAME: &str = "CommunityPost";
const POSTS_COLLECTIONS_NAME: &str = "Posts";

// POST request for COMMUNITY POST
pub async fn posts(client: State<Client>, Json(post): Json<CommunityPostSchema>) -> (StatusCode, Json<String>) {  
    let collection: Collection<UserSchema> = client.database(DB_NAME).collection(USER_COLLECTIONS_NAME);

    posts_update(&client, Json(post.clone())).await;

    let user = match collection.find_one(doc! { "_id": &post.user_id }, None).await {
        Ok(Some(user)) => user,
        Ok(None) => return (StatusCode::NOT_FOUND, Json(String::from("Username not found!"))),
        Err(err) => return (StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Error occured: {:?}", err.to_string())))
    };

    let new_post = CommunityPostSchema {
        user_id: user.clone()._id,
        post_content: String::from("sabinonweb"),
        ..post.clone()
    };

    let mut new = CommunityPostsSchema {
        _id: user._id,
        posts: vec![],
        most_liked: new_post.clone(),
        hot_posts: vec![]
    };

    let post_collection = client.database(DB_NAME).collection(POST_COLLECTIONS_NAME);
    println!("post {:?}", post);

    let p_bson = to_bson(&post).unwrap();
    println!("p_bson {:?}", p_bson);

    if user.verified {
        if is_duplicate_id(&post_collection, &Json(new.clone())).await.unwrap() {
            let user = retrieve_active_user(&post_collection, &Json(new.clone())).await.expect("Couldn't retrieve user!").unwrap();
            match post_collection.update_one(
                doc! {"_id" : user._id},
                doc! {
                "$push" : { "posts" : p_bson.clone() }
            },                None).await {
                Ok(_) => return (StatusCode::OK, Json(String::from("Post updated to the database"))),
                Err(err) => return (StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Error: {:?}", err)))
            }
        } else {
            new.posts.push(post.clone());
            match post_collection.insert_one(
                &new,
                None).await {
                Ok(_) => return (StatusCode::OK, Json(String::from("Post added to the database"))),
                Err(err) => return (StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Error: {:?}", err)))
            }
        }
    }

    (StatusCode::OK, Json(String::new()))
}

pub async fn retrieve_active_user(collection: &Collection<CommunityPostsSchema>, Json(post): &Json<CommunityPostsSchema>) -> Result<Option<CommunityPostsSchema>, String> {
    match collection.find_one(doc!{"_id" : &post._id}, None).await {
        Ok(Some(posts_schema)) => Ok(Some(posts_schema)),
        Ok(None) => Ok(None),
        Err(err) => Err(format!("Error: {:?}", err.to_string()))  
    }
}

pub async fn is_duplicate_id(collection: &Collection<CommunityPostsSchema>, Json(post): &Json<CommunityPostsSchema>) -> Result<bool, String> {
    match collection.find_one(doc!{"_id" : &post._id}, None).await {
        Ok(Some(_)) => Ok(true),
        Ok(None) => Ok(false),
        Err(err) => Err(format!("Error: {:?}", err))
    }
}

pub async fn posts_update(client: &State<Client>, Json(post): Json<CommunityPostSchema>) -> (StatusCode, Json<String>) {
    let collection: Collection<CommunityPostSchema> = client.database(DB_NAME).collection(POSTS_COLLECTIONS_NAME);

    match collection.insert_one(post, None).await {
        Ok(_) => (StatusCode::OK, Json(String::from("Post added to post"))),
        Err(err) => (StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Server Error: {:?}", err))),
    }
}
 
// GET Request for HOT POSTS
#[debug_handler]
pub async fn most_liked(client: State<Client>) -> Result<Json<Vec<CommunityPostSchema>>, Json<String>> {
    let collection: Collection<CommunityPostSchema> = client.database(DB_NAME).collection(POST_COLLECTIONS_NAME);
    println!("collection {:?}", collection.name());

     let find_options = FindOptions::builder()
        // -1 spefcifies the sorting order in descending order
        .sort(doc! { "upvotes" : -1 })
        .limit(10)
        .build(); 
    
    let mut cursor = collection.find(None, find_options)
        .await
        .unwrap();

    let mut posts: Vec<CommunityPostSchema> = Vec::new();

    while let Some(post) = cursor.next().await {
        posts.push(post.unwrap());
    } 

    println!("posts: {:?}", posts);

    Ok(Json(posts))
}

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


