const express = require('express');
const router = express.Router();

router.get("/login", (req, res) => {
    return res.render("login", {msg: ""});
});
router.get("/sign-up", (req, res) => {
    return res.render("sign-up", {msg: ""})
})

module.exports = router;