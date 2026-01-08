import { Schema, models, model } from 'mongoose';

const NoteSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Note = models.Note || model('Note', NoteSchema);
export default Note;
