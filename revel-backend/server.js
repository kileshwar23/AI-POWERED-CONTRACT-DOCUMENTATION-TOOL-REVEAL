const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();

// Middleware — allow frontend dev ports
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const { MongoMemoryServer } = require('mongodb-memory-server');
const { seedAdmin } = require('./src/seed');

// Persistent URI file — keeps the same in-memory DB across nodemon restarts
const URI_FILE = path.join(__dirname, '.mongo-uri');

// Database Connection
const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/revelDB';

    if (process.env.USE_MEMORY_DB === 'true') {
      // Reuse existing in-memory server URI if still alive
      if (fs.existsSync(URI_FILE)) {
        uri = fs.readFileSync(URI_FILE, 'utf8').trim();
        console.log('♻️  Reusing existing In-Memory MongoDB');
      } else {
        const mongoServer = await MongoMemoryServer.create({
          instance: { dbName: 'revelDB' },
        });
        uri = mongoServer.getUri();
        fs.writeFileSync(URI_FILE, uri); // save URI so next restart reuses it
        console.log('⚡ Started new In-Memory MongoDB Server');
      }
    }

    await mongoose.connect(uri);
    console.log('✅ MongoDB connected successfully');

    // Seed default admin user on every start
    await seedAdmin();
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    // Saved URI is stale (in-memory server process died) — clear and retry fresh
    if (fs.existsSync(URI_FILE)) {
      fs.unlinkSync(URI_FILE);
      console.log('🔄 Cleared stale URI, starting fresh DB...');
      return connectDB();
    }
    process.exit(1);
  }
};

connectDB().then(() => {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Revel AI Backend API is running!', version: '1.0.0' });
});

// Routes
app.use('/api/v1/auth', require('./src/routes/authRoutes'));
app.use('/api/v1/documents', require('./src/routes/documentRoutes'));
app.use('/api/v1/ai', require('./src/routes/aiRoutes'));
app.use('/api/v1/search', require('./src/routes/searchRoutes'));
app.use('/api/v1/reports', require('./src/routes/reportRoutes'));
app.use('/api/v1/team', require('./src/routes/teamRoutes'));
app.use('/api/v1/notifications', require('./src/routes/notificationRoutes'));
app.use('/api/v1/admin', require('./src/routes/adminRoutes'));
app.use('/api/v1/threads', require('./src/routes/threadRoutes'));
app.use('/api/v1/clause-library', require('./src/routes/clauseLibraryRoutes'));
app.use('/api/v1/workflow', require('./src/routes/workflowRoutes'));
app.use('/api/v1/signatures', require('./src/routes/signatureRoutes'));
app.use('/api/v1/audit', require('./src/routes/auditRoutes'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: err.message || 'Internal server error' });
});
