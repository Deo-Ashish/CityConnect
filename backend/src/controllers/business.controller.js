const Business = require("../models/business.model");

// ➕ Create Business
exports.createBusiness = async (req, res) => {
  try {
    const { name, description, category, phone, email, address, location, images } = req.body;

    const business = await Business.create({
      name,
      description,
      category,
      phone,
      email,
      address,
      location,
      images,
      owner: req.user.id, // from auth middleware
    });

    res.status(201).json({
      success: true,
      message: "Business created successfully",
      data: business,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating business",
      error: error.message,
    });
  }
};



// 📄 Get All Businesses
exports.getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find()
      .populate("owner", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: businesses.length,
      data: businesses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching businesses",
      error: error.message,
    });
  }
};



// 🔍 Get Single Business
exports.getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id)
      .populate("owner", "username email");

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }

    res.status(200).json({
      success: true,
      data: business,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching business",
      error: error.message,
    });
  }
};



// 📍 Get Nearby Businesses
exports.getNearbyBusinesses = async (req, res) => {
  try {
    const { lng, lat, distance = 5000 } = req.query;

    if (!lng || !lat) {
      return res.status(400).json({
        success: false,
        message: "Please provide lng and lat",
      });
    }

    const businesses = await Business.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseInt(distance),
        },
      },
    });

    res.status(200).json({
      success: true,
      count: businesses.length,
      data: businesses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching nearby businesses",
      error: error.message,
    });
  }
};



// ✏️ Update Business
exports.updateBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }

    // check owner
    if (business.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Business updated successfully",
      data: updatedBusiness,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating business",
      error: error.message,
    });
  }
};



// ❌ Delete Business
exports.deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }

    // check owner
    if (business.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await business.deleteOne();

    res.status(200).json({
      success: true,
      message: "Business deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting business",
      error: error.message,
    });
  }
};