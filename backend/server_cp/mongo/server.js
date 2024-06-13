const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001;

const mongoURL = 'mongodb+srv://ranabhatsabin93:TPegt8SQ7fwGppBM@studdybuddy.w3noad3.mongodb.net/StuddyBuddy?retryWrites=true&w=majority';

app.use(cors());
app.use(express.json());


mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('Failed to connect to MongoDB:', err));


const postSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  username: String,
  upvotes: Number,
  downvotes: Number,
  subject: String,
  post_content: String,
  profile_pic: String,
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});


const emailSchema = new mongoose.Schema({
  username: String,
  email: String,
});

const PostCollection = mongoose.model('StuddyBuddy', postSchema, 'Posts');
const EmailCollection = mongoose.model('StudyBuddy', emailSchema, 'Users');

app.get('/api/user-posts', async (req, res) => {
  const { username } = req.query;

  try {
    console.log('MongoDB connection state:', mongoose.connection.readyState);
    console.log('Requested username:', username);

    const userPosts = await PostCollection.find({ username });
    console.log('User posts:', userPosts);

    if (userPosts.length === 0) {
      return res.status(404).json({ error: 'No posts found for the given username' });
    }

    res.status(200).json(userPosts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ error: 'Failed to fetch user posts' });
  }
});


app.get('/api/user-email', async (req, res) => {
  const { username } = req.query;
  console.log('Requested username:', username);

  try {
    const userEmailDoc = await EmailCollection.findOne({ username });

    if (!userEmailDoc) {
      return res.status(404).json({ error: 'No email found for the given username' });
    }

    const userEmail = userEmailDoc.email;
    console.log('User email:', userEmail);

    res.status(200).json({ email: userEmail });
  } catch (error) {
    console.error('Error fetching user email:', error);
    res.status(500).json({ error: 'Failed to fetch user email' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
