import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import Router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = 8000;

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Frontend origin
    credentials: true, // Allow cookies and credentials
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/data/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Use routes
app.use('/', Router);

// Database connection
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);

// Start server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));



export { upload };
