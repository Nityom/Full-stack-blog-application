const mongoose = require('mongoose');
const { Schema } = mongoose; // Import Schema from mongoose

const postSchema = new Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: {
        type: Schema.Types.ObjectId, // Correct the type definition
        ref: 'User'
    }
}, {
    timestamps: true
});

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;
