use axum::{Extension, extract::State, Json, debug_handler};
use http::StatusCode;
use mongodb::{bson::{doc, to_bson}, Client, Collection};
use crate::models::{community_post_schema::{CommunityPostSchema, CommunityPostsSchema, GetPost}, user::UserSchema};

const DB_NAME: &str = "StuddyBuddy";
const USER_COLLECTIONS_NAME: &str = "Users";
const POST_COLLECTIONS_NAME: &str = "CommunityPost";
const POSTS_COLLECTIONS_NAME: &str = "Posts";

// pub async fn posts(client: State<Client>, Json(post): Json<CommunityPostSchema>) -> (StatusCode, Json<String>) {  
//     let collection: Collection<UserSchema> = client.database(DB_NAME).collection(USER_COLLECTIONS_NAME);
//
//     posts_update(&client, Json(post.clone())).await;
//
//     let user = match collection.find_one(doc! { "_id": &post.user_id }, None).await {
//         Ok(Some(user)) => user,
//         Ok(None) => return (StatusCode::NOT_FOUND, Json(String::from("Username not found!"))),
//         Err(err) => return (StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Error occured: {:?}", err.to_string())))
//     };
//
//     let new_post = CommunityPostSchema {
//         user_id: user.clone()._id,
//         post_content: String::from("sabinonweb"),
//         ..post.clone()
//     };
//
//     let mut new = CommunityPostsSchema {
//         _id: user._id,
//         username: user.username,
//         posts: vec![],
//         most_liked: new_post.clone(),
//         hot_posts: vec![]
//     };
//
//     let post_collection = client.database(DB_NAME).collection(POSTS_COLLECTIONS_NAME);
//     println!("post {:?}", post);
//
//     let p_bson = to_bson(&post).unwrap();
//     println!("p_bson {:?}", p_bson);
//
//     if user.verified {
//         if is_duplicate_id(&post_collection, &Json(new.clone())).await.unwrap() {
//             let user = retrieve_active_user(&post_collection, &Json(new.clone())).await.expect("Couldn't retrieve user!").unwrap();
//             match post_collection.update_one(
//                 doc! {"_id" : user._id},
//                 doc! {
//                 "$push" : { "posts" : p_bson.clone() }
//             },                None).await {
//                 Ok(_) => return (StatusCode::OK, Json(String::from("Post updated to the database"))),
//                 Err(err) => return (StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Error: {:?}", err)))
//             }
//         } else {
//             new.posts.push(post.clone());
//             match post_collection.insert_one(
//                 &new,
//                 None).await {
//                 Ok(_) => return (StatusCode::OK, Json(String::from("Post added to the database"))),
//                 Err(err) => return (StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Error: {:?}", err)))
//             }
//         }
//     }
//
//     (StatusCode::OK, Json(String::new()))
// }
// #[debug_handler]
// pub async fn retrieve_active_user(collection: &Collection<CommunityPostsSchema>, Json(post): &Json<CommunityPostsSchema>) -> Result<Option<CommunityPostsSchema>, String> {
//     match collection.find_one(doc!{"_id" : &post._id}, None).await {
//         Ok(Some(posts_schema)) => Ok(Some(posts_schema)),
//         Ok(None) => Ok(None),
//         Err(err) => Err(format!("Error: {:?}", err.to_string()))  
//     }
// }

// pub async fn is_duplicate_id(collection: &Collection<CommunityPostSchema>, Json(post): &Json<CommunityPostsSchema>) -> Result<bool, String> {
//     println!("\n\nerrrrr: {:?}\n\n", collection.find_one(doc!{"_id" : &post._id}, None).await);
//     match collection.find_one(doc!{"_id" : &post._id}, None).await {
//         Ok(Some(_)) => Ok(true),
//         Ok(None) => Ok(false),
//         Err(err) => Err(format!("Error: {:?}", err))
//     }
// }

#[debug_handler]
pub async fn posts_update(client: State<Client>, Json(post): Json<CommunityPostSchema>) -> (StatusCode, Json<String>) {
    let collection: Collection<CommunityPostSchema> = client.database(DB_NAME).collection(POSTS_COLLECTIONS_NAME);

    println!("posts: {:?}", post);
    println!("Posts called in the paradigm");
    match collection.insert_one(post, None).await {
        Ok(_) => (StatusCode::OK, Json(String::from("Post added to post"))),
        Err(err) => (StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Server Error: {:?}", err))),
    }
}

#[debug_handler]
pub async fn get_posts(
    client: State<Client>,
    Extension(user): Extension<UserSchema>,
) -> Result<(StatusCode, Json<Option<CommunityPostSchema>>), (StatusCode, Json<String>)> {
    let collection: Collection<CommunityPostSchema> = client.database(DB_NAME).collection("Posts");

    match collection.find_one(doc! { "username" : { "$ne" : user.username.clone() } }, None).await {
        Ok(Some(post)) => Ok((StatusCode::OK, Json(Some(post)))),
        Ok(None) => {
            let post = match collection.find_one(doc! { "username" : user.username }, None).await {
                Ok(Some(post)) => Some(post),
                Ok(None) => None,
                Err(err) => return Err((StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Error fetching posts: {:?}", err)))),
            };
            Ok((StatusCode::OK, Json(post)))
        },
        Err(err) => Err((StatusCode::INTERNAL_SERVER_ERROR, Json(format!("Error fetching posts: {:?}", err)))),
    }
}

