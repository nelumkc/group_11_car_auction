// importing packages
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();

// setups
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// define Schema Class
import items from './routes/items.js'
import bids from './routes/bids.js'

// Mount the router middleware at a specific path
app.use('/api', items);
app.use('/api', bids);

// Connect to MongoDB
const URI = process.env.ATLAS_URI;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Start your Express server once connected to MongoDB
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

