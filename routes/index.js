const express = require('express');
const router = express.Router();
const itemRoutes = require('./item.routes');
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');

router.get('/', (req, res) => {
  return res.status(200).json({ success: true, msg: 'From routes' });
});

router.use('/items', itemRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
