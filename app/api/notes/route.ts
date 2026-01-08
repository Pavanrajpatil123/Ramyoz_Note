import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Note from '@/models/Note';

export async function GET() {
  try {
    await dbConnect();
    const notes = await Note.find().sort({ createdAt: -1 });
    return Response.json({ success: true, data: notes }, { status: 200 });
  } catch (err: any) {
    return Response.json({ success: false, message: err?.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { title, content } = body || {};
    if (!title || !content) {
      return Response.json({ success: false, message: 'Title and content are required' }, { status: 400 });
    }
    const created = await Note.create({ title, content });
    return Response.json({ success: true, data: created }, { status: 201 });
  } catch (err: any) {
    return Response.json({ success: false, message: err?.message || 'Server error' }, { status: 500 });
  }
}
