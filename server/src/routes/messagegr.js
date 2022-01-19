var express = require('express');
var router = express.Router();

const MessageGRController = require('../app/controllers/MessageChatGRController');


router.post('/createMSGR', MessageGRController.createMSGR);
router.get('/findmsgr/:id', MessageGRController.findMessageByGroup);
router.get('/findgr/:username', MessageGRController.findMessageByUser);


module.exports = router;