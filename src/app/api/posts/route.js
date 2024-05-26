import { NextResponse } from 'next/server';
import connectDB from '../../../../config/database';
import PostModel from '../../../../models/postModel';

export async function POST(request) {
    await connectDB();
    
    const { name, email, phone, bookTitle, pageCount, description } = await request.json();

    try {
        const post = new PostModel({ name, email, phone, bookTitle, pageCount, description });
        await post.save();
        return NextResponse.json({ success: true, data: post }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function GET() {
    await connectDB();

    try {
        const posts = await PostModel.find();
        return NextResponse.json({ success: true, data: posts }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
