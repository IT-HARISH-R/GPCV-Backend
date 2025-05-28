import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import complaintRoutes from './routes/complaintRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

// const errorPage = require("./utlis/errorPage");

const app = express();

app.use(express.json());
app.use(cors(
    {
        // origin: ['http://localhost:5173'],
        origin: 'https://gptv.netlify.app',
        credentials: true,
        // methods: ['GET', 'POST', 'PATCH', 'DELETE', "PUT"],
    }
))

// app.use(cookieParser())

app.use("/api/v1/", authRoutes);
app.use("/api/v1/", complaintRoutes);
app.use("/api/v1/", contactRoutes);
app.use("/api/v1/gallery", galleryRoutes);
app.use('/api/v1/student', studentRoutes);

app.use('*', (req, res) => {
    console.log('Params:', req.params); // Route parameters (not available in '*', usually empty)
    console.log('Query:', req.query);   // Query string (e.g., ?name=harish)
    console.log('Path:', req.path);     // The path requested
    console.log('Original URL:', req.originalUrl); // Full URL path

    res.json({ message: '404 Check route' }); 
});


// app.use(errorPage); 

export default app

