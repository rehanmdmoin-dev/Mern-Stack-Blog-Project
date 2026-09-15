require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const connectDB = require('./app/config/db');
const { notFound, errorHandler } = require('./app/middleware/errorHandler');

const authRoute = require('./app/routes/api/authRoute');
const userRoute = require('./app/routes/api/userRoute');
const categoryRoute = require('./app/routes/api/categoryRoute');
const tagRoute = require('./app/routes/api/tagRoute');
const blogRoute = require('./app/routes/api/blogRoute');
const commentRoute = require('./app/routes/api/commentRoute');
const likeRoute = require('./app/routes/api/likeRoute');
const profileRoute = require('./app/routes/api/profileRoute');
const dashboardRoute = require('./app/routes/api/dashboardRoute');
const authorRoute = require('./app/routes/api/authorRoute');
const uploadRoute = require('./app/routes/api/uploadRoute');

const app = express();

// --- Core middleware ---
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*', credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
}

// --- Rate limiting ---
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: false, message: 'Too many requests, please try again later' },
});
app.use('/api', apiLimiter);

// Stricter limiter for auth endpoints to slow brute-force attempts
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: false, message: 'Too many auth attempts, please try again later' },
});
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/auth/forgot-password', authLimiter);
app.use('/api/auth/verify-email', authLimiter);
app.use('/api/auth/resend-verification', authLimiter);

// --- Health check ---
app.get('/api/health', (req, res) => {
  res.json({ status: true, message: 'Blog Management System API is running' });
});

// --- Routes ---
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/tags', tagRoute);
app.use('/api/blogs', blogRoute);
app.use('/api/profile', profileRoute);
app.use('/api/dashboard', dashboardRoute);
app.use('/api/authors', authorRoute);
app.use('/api/uploads', uploadRoute);

// Comment and like routes are mounted under /api since they define their own
// full paths internally (e.g. /blogs/:blogId/comments) to support nesting under blogs.
app.use('/api', commentRoute);
app.use('/api', likeRoute);

// --- Error handling (must be last) ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, (error) => {
    if (error) {
      console.log('Error starting server:', error);
    } else {
      console.log('Server is running on port', `http://localhost:${PORT}`);
    }
  });
});
