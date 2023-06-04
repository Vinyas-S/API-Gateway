const express = require('express');
const {InfoController} = require('../../controllers/index')

const userRoutes = require('./user-routes')

const router =express.Router();


router.get('/info', InfoController.info)
router.use('/user',userRoutes)

module.exports = router