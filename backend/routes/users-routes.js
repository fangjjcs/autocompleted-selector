const express = require('express');
// const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', usersController.getUsers);
router.post('/getdata', usersController.getData);

module.exports = router;
