const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { PythonShell } = require('python-shell');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv') {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'));
    }
  }
});

// API Routes
app.post('/api/analyze', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const options = {
      mode: 'text',
      pythonPath: 'python',
      pythonOptions: ['-u'],
      scriptPath: path.join(__dirname, 'python'),
      args: [req.file.path]
    };

    PythonShell.run('analyze.py', options).then(results => {
      // Clean up the uploaded file
      fs.unlinkSync(req.file.path);
      
      try {
        const analysisResults = JSON.parse(results[0]);
        res.json(analysisResults);
      } catch (error) {
        res.status(500).json({ error: 'Failed to parse analysis results' });
      }
    }).catch(err => {
      // Clean up the uploaded file
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      res.status(500).json({ error: 'Analysis failed', details: err.message });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

const PORT = 4005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
