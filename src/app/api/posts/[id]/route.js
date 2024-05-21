import { NextResponse } from 'next/server';
import connectDB from '../../../../../config/database';
import PostModel from '../../../../../models/postModel';

// Get a post by ID
export async function GET(request, { params }) {
    await connectDB();

    try {
        const post = await PostModel.findById(params.id);
        if (!post) {
            return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: post }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

// Update a post by ID
export async function PUT(request, { params }) {
    await connectDB();
    const { name, email, phone, bookTitle, pageCount, description } = await request.json();

    try {
        const post = await PostModel.findByIdAndUpdate(params.id, { name, email, phone, bookTitle, pageCount, description }, { new: true });
        if (!post) {
            return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: post }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

// Delete a post by ID
export async function DELETE(request, { params }) {
    await connectDB();

    try {
        const post = await PostModel.findByIdAndDelete(params.id);
        if (!post) {
            return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: post }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
