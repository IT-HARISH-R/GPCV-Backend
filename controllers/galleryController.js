import Gallery from "../models/galleryModel.js";

export const uploadSingle = async (req, res) => {
  try {
    const newImage = new Gallery({
      imageName: req.body.imageName,
      imageUrl: req.file.path,
    });

    await newImage.save();
    res.status(201).json({ message: "Single image uploaded", data: newImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const uploadMultiple = async (req, res) => {
  try {
    const imageNames = req.body.imageNames;
    console.log("Image Names:", imageNames);
    console.log("Files:", req.files);

    const uploadedImages = req.files.map((file, index) => ({
      imageName: Array.isArray(imageNames) ? imageNames[index] : imageNames,
      imageUrl: file.path,
    }));

    const result = await Gallery.insertMany(uploadedImages);
    res.status(201).json({ message: "Multiple images uploaded", data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
