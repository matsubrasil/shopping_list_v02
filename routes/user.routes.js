const express = require('express');
const router = express.Router();

const UsersController = require('./../controllers/users.controller');

router.post('/', UsersController.register);
router.get('/', UsersController.index);

module.exports = router;
