var express = require('express');
var router = express.Router();

const GroupController = require('../app/controllers/GroupChatController');

router.get('/group',GroupController.listgroup);
router.post('/createGR', GroupController.createGR);
router.put('/update/:id',GroupController.updateGroup);



module.exports = router;