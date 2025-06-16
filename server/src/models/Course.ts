import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  image: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  instructor: mongoose.Types.ObjectId;
  rating: number;
  students: number;
  lessons: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, 'Название курса обязательно'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Описание курса обязательно'],
      trim: true
    },
    image: {
      type: String,
      default: 'https://source.unsplash.com/random/300x200/?education'
    },
    category: {
      type: String,
      required: [true, 'Категория курса обязательна'],
      enum: ['programming', 'mathematics', 'languages', 'science', 'humanities', 'business']
    },
    level: {
      type: String,
      required: [true, 'Уровень курса обязателен'],
      enum: ['beginner', 'intermediate', 'advanced']
    },
    duration: {
      type: String,
      required: [true, 'Продолжительность курса обязательна']
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Преподаватель курса обязателен']
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Рейтинг не может быть меньше 0'],
      max: [5, 'Рейтинг не может быть больше 5']
    },
    students: {
      type: Number,
      default: 0
    },
    lessons: [{
      type: Schema.Types.ObjectId,
      ref: 'Lesson'
    }]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Виртуальное поле для количества уроков
CourseSchema.virtual('lessonCount').get(function() {
  return this.lessons.length;
});

export default mongoose.model<ICourse>('Course', CourseSchema);
