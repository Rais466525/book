import { Schema, model, models } from 'mongoose';

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    coverImageUrl: {
        type: String,
        required: true
    }
}, { timestamps: true });

const BookModel = models.book || model('book', bookSchema);
export default BookModel;
