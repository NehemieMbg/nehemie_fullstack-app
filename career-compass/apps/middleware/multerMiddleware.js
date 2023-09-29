import multer from 'multer';

// Multer middleware for uploading files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  // Keeping the original file name
  filename: (req, file, cb) => {
    const filename = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, filename);
  },
});

const upload = multer({ storage });

export default upload;
