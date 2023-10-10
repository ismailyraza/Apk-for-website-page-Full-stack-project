const multer = require('multer');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination directory where uploaded files will be stored
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Define the filename for the uploaded file
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Create a Multer instance with the configured storage
const upload = multer({ storage: storage });

// Middleware for handling file uploads
app.use('/uploads', express.static('uploads'));
// Image upload route
app.post('/upload', upload.single('image'), (req, res) => {
  // Access the uploaded file information via req.file
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const imageUrl = req.file.path;
  res.json({ message: 'Image uploaded successfully', imageUrl });
});
