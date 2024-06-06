require('dotenv').config({ path: '../../.env' }); 
const mongoose = require('mongoose');
const Post = require('./cp'); 
console.log('Loaded environment variables:', process.env);


const mongoURI = process.env.MONGODB_URI;


if (!mongoURI) {
  console.error('MongoDB URI is not defined in the environment variables.');
  process.exit(1); 
}


console.log('MongoDB URI:', mongoURI);


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    
 
    Post.find()
      .then(posts => {
        console.log('Fetched posts:', posts);
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
      });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
