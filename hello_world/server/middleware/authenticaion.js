const config = require("../config/config");
const jwtSimple = require("jwt-simple");

module.exports = (req, res, next) => {
	const token = req.header("Authorization");

	if (!token) return res.status(401).send({ message: "Must include a token" });

	const payload = jwtSimple.decode(token, config.jwtSecret);

	if (!payload) return res.json({ message: "Unable to decode token" });

	return next();
};
