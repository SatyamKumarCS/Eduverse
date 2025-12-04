import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function clearDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const collections = ['users', 'purchases', 'courseprogresses', 'courses'];
    
    for (const col of collections) {
      try {
        const result = await mongoose.connection.db.collection(col).deleteMany({});
        console.log(`Cleared ${col}: ${result.deletedCount} documents deleted`);
      } catch (e) {
        console.log(`Collection ${col} may not exist, skipping...`);
      }
    }

    console.log('All collections cleared successfully!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

clearDB();
