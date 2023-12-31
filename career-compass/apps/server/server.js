import 'express-async-errors'; // needs to be at the very top to work
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cloudinary from 'cloudinary';
import cookieParser from 'cookie-parser';
// import helmet from 'helmet'; // index.mjs to pass vercel build
import mongoSanitize from 'express-mongo-sanitize';
const app = express();

// Routers
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

// Public
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

// middlewares
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // To log info about requests
}

// allow access to public folder to get images
app.use(express.static(path.resolve(__dirname, './public')));
// Use the provided code to serve static files from the 'public' directory
app.use(
  express.static('public', {
    setHeaders: function (res, path) {
      if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    },
  })
);

// app.use(cors());
// app.use(helmet({ contentSecurityPolicy: false }));
app.use(cookieParser());
app.use(express.json());
// app.use(helmet());
app.use(mongoSanitize());

app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// This middleware has to be the last one
app.use(errorHandlerMiddleware);

// port will be injected by the platform
const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1); // 1 stand for error (same in C)
}
