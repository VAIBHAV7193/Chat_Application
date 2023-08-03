const express = require('express');

const { requireSignIn } = require('../middleware/auth');
const { createChatRoom, getChatRoom } = require('../Controller/chatRoomController');

const router = express.Router();

router.route('/').post(requireSignIn,createChatRoom)
router.route('/').get(requireSignIn,getChatRoom)



module.exports = router;