import express from 'express';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js'
import connectToMongoDb from './db/connectMongoDB.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config({path: '.env'});
const app = express();
app.use(express.static('public'))

// Application level middleWare setup
app.use(express.json({limit: '30mb', extended: true})) // it will parse the data in the req.body
// it will parse the data coming in url, and extended true means we can send any form of data in body not just string
app.use(express.urlencoded({limit: '30mb', extended: true}))
app.use(cors({
  origin: (origin, callback) => {
    callback(null, true); // Allow all origins
  },
  credentials: true // Allow cookies to be sent
}));
app.use(cookieParser())
app.use(express.static('public'))


// setting up the routes
app.use('/posts', postRoutes);
app.use('/user', userRoutes);


// database connection and start server
connectToMongoDb().then(() => {
  app.listen(process.env.PORT || 8000,
    () => console.log('server is listening')
  )
})

