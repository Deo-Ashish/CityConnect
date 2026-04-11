import Business from '../models/Business.js';
import Category from '../models/Category.js';
import Review from '../models/Review.js';

export const getBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find().populate('owner', 'name email');
    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id).populate('owner', 'name email');
    if (!business) return res.status(404).json({ message: 'Business not found' });
    res.status(200).json(business);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBusiness = async (req, res) => {
  try {
    const { name, description, category, phone, email, address, images, lat, lng } = req.body;
    
    const business = await Business.create({
      name, description, category, phone, email, address, images,
      owner: req.user.id,
      location: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)] // [longitude, latitude]
      }
    });
    
    res.status(201).json(business);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBusiness = async (req, res) => {
  try {
<<<<<<< HEAD
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



// 🔍 Search Businesses
exports.searchBusinesses = async (req, res) => {
  try {
    const { category, q } = req.query;

    let query = {};

    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    if (q) {
      query.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    const businesses = await Business.find(query)
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
      message: "Error searching businesses",
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
=======
    let business = await Business.findById(req.params.id);
    if (!business) return res.status(404).json({ message: 'Business not found' });
    
    if (business.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this business' });
>>>>>>> 9abce5f (code written again)
    }
    
    business = await Business.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json(business);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) return res.status(404).json({ message: 'Business not found' });
    
    if (business.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this business' });
    }
    
    await Review.deleteMany({ business: req.params.id }); // cascade delete reviews
    await business.deleteOne();
    res.status(200).json({ message: 'Business removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchNearby = async (req, res) => {
  try {
    const { lat, lng, radius = 10, q } = req.query; // radius in km
    if (!lat || !lng) {
      return res.status(400).json({ message: 'Please provide lat and lng' });
    }
    
    let query = {
      location: {
        $near: {
          $maxDistance: parseFloat(radius) * 1000, // convert to meters
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          }
        }
      }
    };

    if (q) {
      query.$or = [
        { name: { $regex: new RegExp(q, 'i') } },
        { category: { $regex: new RegExp(q, 'i') } },
        { address: { $regex: new RegExp(q, 'i') } },
        { description: { $regex: new RegExp(q, 'i') } }
      ];
    }
    
    const businesses = await Business.find(query);
    
    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchByCategory = async (req, res) => {
    try {
        const { category } = req.query;
        if (!category) return res.status(400).json({ message: 'Category is required' });
        
        const businesses = await Business.find({ category: { $regex: new RegExp(category, 'i') } });
        res.status(200).json(businesses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const seedCategories = async (req, res) => {
    try {
        const categories = [
            { name: 'Electricians', icon: 'zap', slug: 'electricians' },
            { name: 'Plumbers', icon: 'droplet', slug: 'plumbers' },
            { name: 'Tutors', icon: 'book', slug: 'tutors' },
            { name: 'Restaurants', icon: 'utensils', slug: 'restaurants' },
            { name: 'Cafes', icon: 'coffee', slug: 'cafes' },
            { name: 'Repair shops', icon: 'tool', slug: 'repair-shops' },
            { name: 'Medical stores', icon: 'cross', slug: 'medical-stores' },
            { name: 'Gyms', icon: 'dumbbell', slug: 'gyms' },
            { name: 'Beauty salons', icon: 'scissors', slug: 'beauty-salons' },
            { name: 'Car mechanics', icon: 'wrench', slug: 'car-mechanics' }
        ];

        await Category.deleteMany({});
        const created = await Category.insertMany(categories);
        res.status(201).json(created);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};
