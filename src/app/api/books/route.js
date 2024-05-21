import { NextResponse } from 'next/server';
import connectDB from '../../../../config/database';
import BookModel from '../../../../models/bookModel';

export async function POST(request) {
    await connectDB();
    
    const { title, author, description, price, coverImageUrl } = await request.json();

    try {
        const book = new BookModel({ title, author, description, price, coverImageUrl });
        await book.save();
        return NextResponse.json({ success: true, data: book }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function GET() {
    await connectDB();

    try {
        const books = await BookModel.find();
        return NextResponse.json({ success: true, data: books }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
