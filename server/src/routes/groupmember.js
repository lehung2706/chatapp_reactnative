var express = require('express');
var router = express.Router();

const GRMController = require('../app/controllers/GroupMemberController');

router.post('/createGRM', GRMController.createGRM);
router.get('/findone/:username', GRMController.findRoomByUser);



module.exports = router;