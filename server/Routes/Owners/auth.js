const express = require('express');
const router = express.Router();
const {addOwners,LoginAuth} = require('../../controllers/owners/auth/auth')

router.post('/auth/register',addOwners);
router.post('/auth/login',LoginAuth);

module.exports = router;