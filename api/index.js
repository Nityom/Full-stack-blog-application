const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

const User = require('./models/UserModel');
const Post = require('./models/Post');

const app = express();
const uploadMiddleware = multer({ dest: 'uploads/' });
const saltRounds = 10;
const secret = process.env.JWT_SECRET || 'my_jsonwebtoken_secured_key'; // Use environment variable for secret

app.use(cors({
  credentials: true,
  origin: "https://full-stack-blog28.netlify.app", // Adjust according to your client origin
}));
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));

const connectionurl = process.env.MONGODB_URL;

mongoose.connect(connectionurl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

// Sign Up Route
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const newUser = await User.create({ username, password: hashedPassword });
    res.status(201).json({ user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    if (!userDoc || !bcrypt.compareSync(password, userDoc.password)) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: userDoc._id, username: userDoc.username }, secret, { expiresIn: '1h' });
    res.cookie('token', token, {maxAge: 3600000 }) // 1 hour
      .status(200).json({ message: 'Login successful', id: userDoc._id, username: userDoc.username, token , cookie });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

// Profile Route
app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, secret, (err, info) => {
    if (err) return res.status(401).json({ message: 'Unauthorized', error: err.message });
    res.json(info);
  });
});

// Logout Route
app.post('/logout', (req, res) => {
  res.cookie('token', '', { maxAge: 0 });
  res.status(200).json({ message: 'Logged out successfully' });
});

// Post Creation Route
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  const { originalname, path } = req.file;
  const ext = originalname.split('.').pop();
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);

  const { title, summary, content } = req.body;
  const { token } = req.cookies;
  
  try {
    jwt.verify(token, secret, async (err, info) => {
      if (err) return res.status(401).json({ message: 'Unauthorized', error: err.message });
      const postDoc = await Post.create({ title, summary, content, cover: newPath, author: info.id });
      res.json(postDoc);
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating post', error: err.message });
  }
});

// Get All Posts Route
app.get('/allposts', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', ['username']).sort({ createdAt: -1 }).limit(20);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts', error: err.message });
  }
});

// Get Single Post Route
app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const postDoc = await Post.findById(id).populate('author', ['username']);
    if (!postDoc) return res.status(404).json({ message: 'Post not found' });
    res.json(postDoc);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching post', error: err.message });
  }
});

// Update Post Route
app.put('/post/:id', uploadMiddleware.single('file'), async (req, res) => {
  const { id } = req.params;
  const { title, summary, content } = req.body;

  try {
    const postDoc = await Post.findById(id);
    if (!postDoc) return res.status(404).json({ message: 'Post not found' });

    postDoc.title = title || postDoc.title;
    postDoc.summary = summary || postDoc.summary;
    postDoc.content = content || postDoc.content;

    if (req.file) {
      const { originalname, path } = req.file;
      const ext = originalname.split('.').pop();
      const newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
      postDoc.cover = newPath;
    }

    await postDoc.save();
    res.json(postDoc);
  } catch (err) {
    res.status(500).json({ message: 'Error updating post', error: err.message });
  }
});

// Start the Server
app.listen(4000, () => {
  console.log('Server started on port 4000');
});
