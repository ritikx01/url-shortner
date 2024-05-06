const express = require('express');
const router = express.Router();

const {handleRedirectToURL} = require("../controllers/url");

router.get("/", (req, res) => {
	res.render("home");
})
router.get('/:shortID', handleRedirectToURL);

module.exports = router;