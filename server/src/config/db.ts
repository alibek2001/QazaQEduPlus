import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGODB_URI as string;
  const maxRetries = parseInt(process.env.MONGODB_RETRY_COUNT || '5', 10);

  if (!mongoURI) {
    console.error('MongoDB URI is not defined in environment variables');
    process.exit(1);
  }

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await mongoose.connect(mongoURI);
      console.log('MongoDB Connected...');
      return;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown MongoDB connection error';
      console.error(`MongoDB connection attempt ${attempt} failed: ${msg}`);
      if (attempt < maxRetries) {
        console.log('Retrying connection...');
        await delay(1000 * attempt);
      }
    }
  }

  console.error(`Unable to connect to MongoDB after ${maxRetries} attempts. Exiting.`);
  process.exit(1);
};

export default connectDB;
