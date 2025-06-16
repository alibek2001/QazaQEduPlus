import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI as string;
    
    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }
    
    await mongoose.connect(mongoURI);
    
    console.log('MongoDB Connected...');
  } catch (err) {
    if (err instanceof Error) {
      console.error(`MongoDB connection error: ${err.message}`);
    } else {
      console.error('Unknown MongoDB connection error');
    }
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
