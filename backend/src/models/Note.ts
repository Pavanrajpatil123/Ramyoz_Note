import mongoose, { Schema, model } from 'mongoose';

const NoteSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Note = mongoose.models.Note || model('Note', NoteSchema);
export default Note;
