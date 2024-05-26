import { NextResponse } from 'next/server';
import connectDB from '../../../../../config/database';
import BookModel from '../../../../../models/bookModel';

// Get a book by ID
export async function GET(request, { params }) {
    await connectDB();

    try {
        const book = await BookModel.findById(params.id);
        if (!book) {
            return NextResponse.json({ success: false, error: 'Book not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: book }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

// Update a book by ID
export async function PUT(request, { params }) {
    await connectDB();
    const { title, author, description, price, coverImageUrl } = await request.json();

    try {
        const book = await BookModel.findByIdAndUpdate(params.id, { title, author, description, price, coverImageUrl }, { new: true });
        if (!book) {
            return NextResponse.json({ success: false, error: 'Book not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: book }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

// Delete a book by ID
export async function DELETE(request, { params }) {
    await connectDB();

    try {
        const book = await BookModel.findByIdAndDelete(params.id);
        if (!book) {
            return NextResponse.json({ success: false, error: 'Book not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: book }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
