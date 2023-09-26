import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // To log info about requests
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', (req, res) => {
  console.log(req);
  res.status(200).json({ message: 'success', data: req.body });
});

// port will be injected by the platform
const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`Server running on PORT ${port}...`);
});
