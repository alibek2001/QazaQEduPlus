import mongoose, { Document, Schema, Model } from 'mongoose';

// Student interface that extends Document
export interface StudentDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: Date;
  address?: string;
  enrollmentDate: Date;
  graduationDate?: Date;
  status: 'active' | 'inactive' | 'graduated';
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  
  // Instance methods
  getFullName(): string;
  getAge(): number;
  isActive(): boolean;
}

// Student schema
const StudentSchema = new Schema<StudentDocument>(
  {
    firstName: {
      type: String,
      required: [true, 'Имя обязательно'],
      trim: true,
      maxlength: [50, 'Имя не может быть длиннее 50 символов']
    },
    lastName: {
      type: String,
      required: [true, 'Фамилия обязательна'],
      trim: true,
      maxlength: [50, 'Фамилия не может быть длиннее 50 символов']
    },
    email: {
      type: String,
      required: [true, 'Email обязателен'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Пожалуйста, введите корректный email']
    },
    phone: {
      type: String,
      required: [true, 'Номер телефона обязателен'],
      match: [/^\+?[0-9]{10,15}$/, 'Пожалуйста, введите корректный номер телефона']
    },
    dateOfBirth: {
      type: Date
    },
    address: {
      type: String,
      maxlength: [200, 'Адрес не может быть длиннее 200 символов']
    },
    enrollmentDate: {
      type: Date,
      default: Date.now
    },
    graduationDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'graduated'],
      default: 'active'
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Pre-save hook for validation
StudentSchema.pre('save', function(next) {
  // Log creation
  if (this.isNew) {
    console.log(`Creating new student: ${this.firstName} ${this.lastName}`);
  }
  
  // Validate required fields
  if (!this.firstName || !this.lastName || !this.email || !this.phone) {
    const error = new Error('Missing required fields');
    return next(error);
  }
  
  next();
});

// Instance methods
StudentSchema.methods.getFullName = function(): string {
  return `${this.firstName} ${this.lastName}`;
};

StudentSchema.methods.getAge = function(): number {
  if (!this.dateOfBirth) return 0;
  
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

StudentSchema.methods.isActive = function(): boolean {
  return this.status === 'active';
};

// Create and export the Student model
export const Student: Model<StudentDocument> = mongoose.model<StudentDocument>('Student', StudentSchema);
