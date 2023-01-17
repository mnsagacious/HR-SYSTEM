const express = require('express');
const router = express.Router();
const {getallowners,updateOwners,deleteOwners,getspecificOwners} = require('../../controllers/owners/owners/owners')
router.get('/',getallowners);
router.get('/:id',getspecificOwners)
router.put('/:id',updateOwners);
router.delete('/:id',deleteOwners);

module.exports = router