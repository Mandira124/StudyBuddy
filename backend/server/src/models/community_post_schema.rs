use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct CommunityPostSchema {
    pub user_id: ObjectId,
    pub username: String,
    pub upvotes: u32,
    pub downvotes: u32,
    pub subject: String,
    pub post_content: String,
    pub profile_pic: Option<String>,
    pub comment: Vec<String>,   
<<<<<<< HEAD
} 

// #[derive(Clone, Debug, Deserialize, Serialize)]
// pub struct Comment {
//     pub username: String,
//     pub comment: String,
//     pub file: 
// }
=======
}  
>>>>>>> 2468baebb397a8835d78776e49a8165d695afdc2

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
    pub username: String,
    pub posts: Vec<CommunityPostSchema>,
    pub most_liked: CommunityPostSchema,
    pub hot_posts: Vec<CommunityPostSchema>,    
}
