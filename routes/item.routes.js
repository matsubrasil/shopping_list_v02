const express = require('express');
const router = express.Router();
// const authMiddleware = require('./../middleware/auth');
const ItemsController = require('./../controllers/Items.controller');

// router.get('/', ItemsController.index);
// router.post('/', authMiddleware, ItemsController.store);
// router.delete('/:id', authMiddleware, ItemsController.del);
router.get('/', ItemsController.index);
router.post('/', ItemsController.store);
router.delete('/:id', ItemsController.del);
module.exports = router;
