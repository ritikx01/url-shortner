const { getUser } = require("../services/auth");

function checkAuth(req, res, next) {
	const user = getUser(req.cookies?.uid);
    if (user == undefined){
        return res.redirect("/")
    } 
	next();
}

module.exports = checkAuth;
