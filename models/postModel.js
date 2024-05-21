import { Schema, model, models } from 'mongoose';

const postSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

const PostModel = models.post || model('post', postSchema);
export default PostModel;
