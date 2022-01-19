var express = require('express');
var router = express.Router();

const DirectRoomController = require('../app/controllers/DRRoomController');

router.post('/create', DirectRoomController.create);
router.post('/find', DirectRoomController.findRoom);
router.get('/findroom/:username', DirectRoomController.findRoomByUser);
router.put('/update/:id',DirectRoomController.update);



module.exports = router;