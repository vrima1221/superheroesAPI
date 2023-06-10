import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import { router as superheroRouter } from './routes/superheroRouter.js';

const dbUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@superheroesdb.f0vdu1h.mongodb.net/?retryWrites=true&w=majority`

try {
  await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to db');
} catch (error) {
  console.log('Cannot connect to db', error);
}

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(superheroRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

