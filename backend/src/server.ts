import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { isValidObjectId } from 'mongoose';
import dbConnect from './lib/mongodb.js';
import Note from './models/Note.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: true }));
app.use(express.json());

// Ensure DB connection once at startup
(async () => {
  try {
    await dbConnect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
})();

app.get('/health', (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.get('/notes', async (_req: Request, res: Response) => {
  try {
    await dbConnect();
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: notes });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err?.message || 'Server error' });
  }
});

app.post('/notes', async (req: Request, res: Response) => {
  try {
    await dbConnect();
    const { title, content } = req.body || {};
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }
    const created = await Note.create({ title, content });
    res.status(201).json({ success: true, data: created });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err?.message || 'Server error' });
  }
});

app.get('/notes/:id', async (req: Request, res: Response) => {
  try {
    await dbConnect();
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID' });
    }
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: note });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err?.message || 'Server error' });
  }
});

app.put('/notes/:id', async (req: Request, res: Response) => {
  try {
    await dbConnect();
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID' });
    }
    const { title, content } = req.body || {};
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }
    const updated = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err?.message || 'Server error' });
  }
});

app.delete('/notes/:id', async (req: Request, res: Response) => {
  try {
    await dbConnect();
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID' });
    }
    const deleted = await Note.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: { _id: id } });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err?.message || 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
});
