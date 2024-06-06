use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct CommunityPostSchema {
    pub user_id: ObjectId,
    pub upvotes: u32,
    pub downvotes: u32,
    pub subject: String,
    pub post_content: String,
    pub profile_pic: Option<String>,
    pub comment: Vec<String>,   
}  

// impl CommunityPostsSchema {
//     fn new(Json(post): Json<CommunityPostSchema>) -> Self {
//         Self {
//             _id: ObjectId::
//         }
//     }
// }

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct CommunityPostsSchema {
    pub _id: ObjectId,
    pub posts: Vec<CommunityPostSchema>,
    pub most_liked: CommunityPostSchema,
    pub hot_posts: Vec<CommunityPostSchema>,    
}
