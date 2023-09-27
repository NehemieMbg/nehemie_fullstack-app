import 'express-async-errors'; // needs to be at the very top to work
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
const app = express();

// Routers
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

// middlewares
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // To log info about requests
}
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/api/v1/test', (req, res) => {
  res.json({ message: 'Test Route' });
});

app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

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
