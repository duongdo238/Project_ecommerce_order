const express = require('express')

const router = express.Router()

//middlewares
const {authCheck} = require ('../middlewares/auth')

//import
const { createOrUpdateUser } = require('../controllers/auth')

router.post("/create-or-update-user", authCheck, createOrUpdateUser);

module.exports = router;