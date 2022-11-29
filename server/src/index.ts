require('dotenv').config();

import express from 'express';
import cors from 'cors';
import { connectDb } from './database';
import {
  authRoutes,  
  userRoutes,
} from './routes';
import { PORT } from './config';
import passport from 'passport';
import bodyParser from 'body-parser';

// initialize passport
require('./lib/passport');

const app = express();

const start = async () => {
  // connect to db
  await connectDb();

  app.use(cors());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(passport.initialize());

  // setup routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);


  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

start();
