const propertyModel = require("../models/property.model");
const { uploadFile } = require("../services/storage.services");
const jwt = require("jsonwebtoken");

async function createProperty(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { title } = req.body;
  const file = req.file;

  const result = await uploadFile(file.buffer.toString("base64"));

  const property = await propertyModel.create({ image: image.url, title });

  res.status(201).json({
    message: "property created successfully",
    property: {
      id: property._id,
      image: property.url,
      title: property.title,
    },
  });

  
}

module.exports = { createProperty };
