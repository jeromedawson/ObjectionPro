const mongoose = require('mongoose');

const connectDB = async (dbName, options = {}) => {
  try {
    const defaultOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };

    const connectionOptions = { ...defaultOptions, ...options };

    await mongoose.connect(process.env.MONGODB_URI, connectionOptions);

    const db = mongoose.connection;

    db.on('error', (error) => {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    });

    db.once('open', () => {
      console.log('MongoDB connected successfully');
      if (dbName) {
        console.log(`Using database: ${dbName}`);
        db.db = db.useDb(dbName);
      }
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
