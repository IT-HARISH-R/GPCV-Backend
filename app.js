import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import complaintRoutes from './routes/complaintRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';

// const errorPage = require("./utlis/errorPage");

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: ['http://localhost:5173'],
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE', "PUT"],
    }
))

// app.use(cookieParser())

app.use("/api/v1/", complaintRoutes);
app.use("/api/v1/", contactRoutes);
app.use("/api/v1/gallery", galleryRoutes);

// app.use(errorPage); 

export default app

