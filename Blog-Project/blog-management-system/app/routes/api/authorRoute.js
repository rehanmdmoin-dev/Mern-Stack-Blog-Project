const express = require('express');
const AuthorController = require('../../controller/api/AuthorController');

const router = express.Router();

router.get('/:id', AuthorController.getAuthorProfile);

module.exports = router;
