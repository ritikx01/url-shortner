const sha1 = require("js-sha1");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");

async function handleUserLogin(req, res) {
	const DBUser = await User.findOne({email: req.body.email});
	if (!DBUser || DBUser.password !== sha1(req.body.password)) {
		return res.render("login", { msg: "Wrong username or password" });
	}
	const sessionId = uuidv4();
	setUser(sessionId, DBUser);
	res.cookie("uid", sessionId);
	return res.redirect("/");
}

async function handleUserSignup(req, res) {
	body = req.body;
	if (!body || !body.email || !body.password) {
		return res.render("sign-up", { msg: "Please input all the fields" });
	}
	if (await User.findOne({email: body.email})){
		return res.render("sign-up", {msg: "Email already used"});
	}
	const DBUser = await User.create({
		email: body.email,
		password: sha1(body.password),
	});
	const sessionId = uuidv4();
	setUser(sessionId, DBUser);
	res.cookie("uid", sessionId);
	return res.redirect("/");
}
module.exports = {
	handleUserLogin,
	handleUserSignup
};
