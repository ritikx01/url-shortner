const express = require('express');
const router = express.Router();

const {
	handleGetAllURL,
	handleCreateURL,
	handleShowAnalytics,
} = require("../controllers/url");

router.get('/', handleGetAllURL);
router.post('/', handleCreateURL);
router.get('/create', handleCreateURL);
router.get('/:shortID', handleShowAnalytics);

module.exports = router;