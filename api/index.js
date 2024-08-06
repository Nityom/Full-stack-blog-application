const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
require('dotenv').config();
const fs = require('fs');
const Post = require('./models/Post.js');

const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET || 'my_jsonwebtoken_secured_key'; // Ensure to use a secure secret key

app.use(cors({
  credentials: true,
  origin: "https://full-stack-blog28.netlify.app",
}));

app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));

const connectionurl = process.env.MONGODB_URL;

mongoose.connect(connectionurl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await User.create({
      username,
      password: bcrypt.hashSync(password, salt)
    });
    res.status(200).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const isPasswordValid = bcrypt.compareSync(password, userDoc.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: userDoc._id, username: userDoc.username }, secret, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 })
      .status(200).json({ message: 'Login successful', id: userDoc._id, username: userDoc.username, token });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error });
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    res.json(info);
  });
});

app.post('/logout', (req, res) => {
  res.cookie('token', '', { maxAge: 0 });
  res.status(200).json({ message: 'Logged out successfully' });
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newpath = path + '.' + ext;
  fs.renameSync(path, newpath);

  const { title, summary, content } = req.body;
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    try {
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newpath,
        author: info.id
      });
      res.json(postDoc);
    } catch (error) {
      res.status(500).json({ message: 'Error creating post', error });
    }
  });
});

app.get('/allposts', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts', error: err });
  }
});

app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error });
  }
});

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
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      const newpath = path + '.' + ext;
      fs.renameSync(path, newpath);
      postDoc.cover = newpath;
    }

    await postDoc.save();
    res.json(postDoc);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error.message });
  }
});

const server = app.listen(4000, '0.0.0.0', () => {
  console.log('server started on port 4000');
});

server.keepAliveTimeout = 120000; // 120 seconds
server.headersTimeout = 120000; // 120 seconds
