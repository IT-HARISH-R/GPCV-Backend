import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import { uploadSingle, uploadMultiple } from "../controllers/galleryController.js";

const galleryRoutes = express.Router();

const upload = multer({ storage });

galleryRoutes.post("/upload-single", upload.single("image"), uploadSingle);
galleryRoutes.post("/upload-multiple", upload.array("images", 10), uploadMultiple);

export default galleryRoutes; 
