import mongoose, { Document, Schema } from 'mongoose';

export interface ILesson extends Document {
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  duration: number; // в минутах
  order: number;
  course: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema = new Schema<ILesson>(
  {
    title: {
      type: String,
      required: [true, 'Название урока обязательно'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Описание урока обязательно'],
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Содержание урока обязательно']
    },
    videoUrl: {
      type: String
    },
    duration: {
      type: Number,
      required: [true, 'Продолжительность урока обязательна'],
      min: [1, 'Продолжительность урока должна быть не менее 1 минуты']
    },
    order: {
      type: Number,
      required: [true, 'Порядковый номер урока обязателен']
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Курс, к которому относится урок, обязателен']
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ILesson>('Lesson', LessonSchema);
