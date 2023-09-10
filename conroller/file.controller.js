const express = require('express');
const router = express.Router();
const http_codes = require('http-status-codes');
const multer = require('multer');
const File = require('../model/file.model');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '..', 'uploads');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, uniqueSuffix + fileExtension);
    }
});

const uploads = multer({ storage: storage });

router.post('/', uploads.single('file'), async(req, res) => {
    try {
        if(!req.file) {
            return res.status(http_codes.BAD_REQUEST).json({
                error: 'No file uploaded'
            });
        }
        // Create new file record in the database
        const { originalname, filename, size } = req.file;

        const newFile = new File({
            name: originalname,
            filename,
            size
        });

        await newFile.save();
        res.status(http_codes.CREATED).json({
            message: 'New file uploaded',
            file: newFile
        });
    } catch(err) {
        console.error('Error uploading file: ' + err);
        res.status(http_codes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    };
});

// Download file
router.get('/download/:filename', async(req, res) => {
    try {
        const { filename } = req.params;
        const file = await File.findOne({ filename });

        if(!file) {
            return res.status(http_codes.NOT_FOUND).json({
                error: 'File not found'
            });
        }

        const file_path = path.join(__dirname, '..', 'uploads', filename);

        res.sendFile(file_path);
    } catch(err) {
        console.error('Error downloading file: ' + err);
        res.status(http_codes.INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
            message: err.message
        });
    }
});

module.exports = router;