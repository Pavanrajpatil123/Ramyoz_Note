import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Note from '@/models/Note';
import { isValidObjectId } from 'mongoose';

type Params = { params: { id: string } };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const { id } = params;
    if (!isValidObjectId(id)) {
      return Response.json({ success: false, message: 'Invalid ID' }, { status: 400 });
    }
    const note = await Note.findById(id);
    if (!note) return Response.json({ success: false, message: 'Not found' }, { status: 404 });
    return Response.json({ success: true, data: note }, { status: 200 });
  } catch (err: any) {
    return Response.json({ success: false, message: err?.message || 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const { id } = params;
    if (!isValidObjectId(id)) {
      return Response.json({ success: false, message: 'Invalid ID' }, { status: 400 });
    }
    const body = await req.json();
    const { title, content } = body || {};
    if (!title || !content) {
      return Response.json({ success: false, message: 'Title and content are required' }, { status: 400 });
    }
    const updated = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!updated) return Response.json({ success: false, message: 'Not found' }, { status: 404 });
    return Response.json({ success: true, data: updated }, { status: 200 });
  } catch (err: any) {
    return Response.json({ success: false, message: err?.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const { id } = params;
    if (!isValidObjectId(id)) {
      return Response.json({ success: false, message: 'Invalid ID' }, { status: 400 });
    }
    const deleted = await Note.findByIdAndDelete(id);
    if (!deleted) return Response.json({ success: false, message: 'Not found' }, { status: 404 });
    return Response.json({ success: true, data: { _id: id } }, { status: 200 });
  } catch (err: any) {
    return Response.json({ success: false, message: err?.message || 'Server error' }, { status: 500 });
  }
}
