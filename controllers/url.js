const URL = require("../models/url");
const shortid = require("shortid");
const { getUser } = require("../services/auth")

async function handleGetAllURL(req, res) {
	const user = getUser(req.cookies.uid);
	const urls = await URL.find({user: user._id});
	console.log(urls);
	return res.render('url', {
		urls: urls
	});
}
async function handleCreateURL(req, res) {
	const shortID = shortid();
	if (!req.body.url) return res.render("create", { msg: "" });
	const preID = await URL.findOne({ redirectURL: req.body.url });
	if (preID) {
		return res.json({ msg: `ShortID already exist: ${preID.shortID}` });
	}
	const userObj = getUser(req.cookies.uid);
	await URL.create({
		redirectURL: req.body.url,
		shortID: shortID,
		user: userObj._id,
		visitHistory: [],
	});
	return res.render("create", { msg: shortID });
}
async function handleRedirectToURL(req, res) {
	const url = await URL.findOneAndUpdate(
		{ shortID: req.params.shortID },
		{ $push: { visitHistory: { timestamps: Date.now() } } }
	);
	return res.redirect(url ? url.redirectURL : "/");
}
async function handleShowAnalytics(req, res) {
	const user = getUser(req.cookies.uid);
	const url = await URL.findOne({ shortID: req.params.shortID, user: user._id });
	if (url === null) {
		return res.redirect("/");
	}
	return res.render('url', {
		urls: [url]
	});
}

module.exports = {
	handleGetAllURL,
	handleCreateURL,
	handleRedirectToURL,
	handleShowAnalytics,
};
