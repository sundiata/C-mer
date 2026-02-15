const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Database path: use env var for deployment, default for local
const dbDir = path.dirname(process.env.DATABASE_PATH || path.join(__dirname, '..', 'data', 'admin-panel.db'));
const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '..', 'data', 'admin-panel.db');

// Ensure data directory exists (needed for deployment)
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ SQLite initialization failed:', err.message);
  } else {
    console.log('✅ SQLite database connected');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  db.serialize(() => {
    // Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        email TEXT,
        role TEXT DEFAULT 'admin',
        name TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Sessions table
    db.run(`
      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        username TEXT,
        login_time DATETIME DEFAULT CURRENT_TIMESTAMP,
        ip_address TEXT,
        user_agent TEXT,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);

    // Blogs table
    db.run(`
      CREATE TABLE IF NOT EXISTS blogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        content TEXT NOT NULL,
        excerpt TEXT,
        author TEXT,
        author_bio TEXT,
        author_image TEXT,
        category TEXT,
        tags TEXT, -- JSON array
        status TEXT DEFAULT 'draft',
        publish_date TEXT,
        featured_image TEXT,
        reading_time INTEGER DEFAULT 0,
        seo_title TEXT,
        seo_description TEXT,
        seo_keywords TEXT, -- JSON array
        social_title TEXT,
        social_description TEXT,
        social_image TEXT,
        views INTEGER DEFAULT 0,
        likes INTEGER DEFAULT 0,
        comments INTEGER DEFAULT 0,
        related_posts TEXT, -- JSON array of IDs
        is_featured INTEGER DEFAULT 0,
        is_breaking INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Projects table
    db.run(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        client TEXT,
        category TEXT,
        description TEXT,
        image TEXT,
        technologies TEXT, -- JSON array
        duration TEXT,
        team TEXT,
        status TEXT DEFAULT 'planning',
        featured INTEGER DEFAULT 0,
        results TEXT, -- JSON array of strings
        graph_title TEXT,
        graph_bars TEXT, -- JSON array of {label,value,color,unit}
        graph_explanation TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Contacts table (public submissions from Apply form)
    db.run(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        email TEXT,
        phone TEXT,
        company TEXT,
        position TEXT,
        service_type TEXT,
        project_description TEXT,
        budget TEXT,
        timeline TEXT,
        additional_info TEXT,
        status TEXT DEFAULT 'new',
        submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert default admin user if not exists
    const bcrypt = require('bcryptjs');
    const defaultPassword = bcrypt.hashSync('admin123', 10);

    db.get("SELECT id FROM users WHERE username = ?", ['admin'], (err, row) => {
      if (!row) {
        db.run(
          "INSERT INTO users (username, password_hash, email, name, role) VALUES (?, ?, ?, ?, ?)",
          ['admin', defaultPassword, 'admin@dataanalyticspro.com', 'Administrator', 'admin'],
          function(err) {
            if (err) {
              console.error('❌ Error creating default user:', err.message);
            } else {
              console.log('✅ Default admin user created');
            }
          }
        );
      }
    });

    console.log('✅ Database tables initialized');
  });
}

// Make database available to routes
global.db = db;

const app = express();
const PORT = process.env.PORT || 3004;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api/', limiter);

// CORS configuration: merge localhost + production URLs from env
const baseOrigins = [
  'http://localhost:3000', 'http://localhost:3002', 'http://localhost:3001', 'http://localhost:5173',
  'http://127.0.0.1:3000', 'http://127.0.0.1:3002', 'http://127.0.0.1:3001', 'http://127.0.0.1:5173'
];
const extraOrigins = (process.env.CORS_ORIGINS || '').split(',').map(o => o.trim()).filter(Boolean);
const allowedOrigins = [...baseOrigins, ...extraOrigins];

// CORS middleware: allow all origins for public contact submissions, restrict others
app.use((req, res, next) => {
  if (req.path.startsWith('/api/contacts')) {
    return cors({ origin: true })(req, res, next);
  }
  return cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  })(req, res, next);
});

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Blog routes
const blogRoutes = require('./routes/blogs');
app.use('/api/blogs', blogRoutes);

// Project routes
const projectRoutes = require('./routes/projects');
app.use('/api/projects', projectRoutes);

// Contact routes
const contactRoutes = require('./routes/contacts');
app.use('/api/contacts', contactRoutes);

// User routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// Dashboard routes
const dashboardRoutes = require('./routes/dashboard');
app.use('/api/dashboard', dashboardRoutes);

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);

  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
