import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  imageName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Gallery = mongoose.model("Gallery", gallerySchema);
export default Gallery;
