var express = require('express');
var router = express.Router();

const MessageDRController = require('../app/controllers/MessageController');

router.post('/create', MessageDRController.create);
router.get('/findmsdr/:id', MessageDRController.findMessageByRoom);


module.exports = router;