const express = require('express')
const { protect } = require('../middleware/AuthMiddleware');

const { 
    registerUser,
    loginUser,
    getUserInfo
} = require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware');

const router  = express.Router()

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

router.post("/uploadProfileImage", upload.single('profileImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const profileImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ profileImageUrl });
});

module.exports = router