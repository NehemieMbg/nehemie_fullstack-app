import 'express-async-errors'; // needs to be at the very top to work
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
const app = express();

// Routers
import jobRouter from './routes/jobRouter.js';
// middlewares
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // To log info about requests
}
app.use(express.json());

app.use('/api/v1/jobs', jobRouter);

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
