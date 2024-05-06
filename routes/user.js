const express = require('express');
const router = express.Router();
const { handleUserLogin, handleUserSignup } = require("../controllers/user");
const authenticateRouter = require("../routes/staticRoute");

router.route('/login')
.get(authenticateRouter)
.post(handleUserLogin);

router.route('/sign-up')
.get(authenticateRouter)
.post(handleUserSignup);

module.exports = router;