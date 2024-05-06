const express = require("express");
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

const checkAuth = require("./middlewares/auth")

// Connect MongoDB
const PORT = 9001;
const connectToDB = require("./connection");
const mongoURL = "mongodb://127.0.0.1:27017/url-shortner";
connectToDB(mongoURL)
	.then(() => console.log("DB connected"))
	.catch((err) => console.log(err));
	
// Routes
const URLRouter = require("./routes/url");
const userRouter = require("./routes/user");
const redirectRouter = require("./routes/redirect")

// Middlewares
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// Route requests
app.use("/url", checkAuth, URLRouter);
app.use("/user", userRouter);
app.use("/", redirectRouter);

// Start app
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
