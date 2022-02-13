const express = require('express');
const router = express.Router();
const {getUsers}=require('../controller/usersController');
const { decorateHtmlResponse } = require('../middlewares/common/decoratehtmlResponse');
router.get('/',decorateHtmlResponse("Users"),getUsers)
module.exports =router