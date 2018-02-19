const router = require("express").Router();
const userSchema = require("../../models/user");
const jwtSimple = require("jwt-simple");
const bcrypt = require("bcryptjs");
const config = require("../config/config");

const jwtSecret = config.jwtSecret;

router.get("/", (req, res) => {
	userSchema.find((err, users) => {
		if (err) res.status(500).send(err);
		return res.send(users);
	});
});

// Create user
router.post("/", (req, res) => {
	const user = req.body;

	if (!user.userName || !user.password) {
		return res.status(400).send("Must contain user name, password");
	}

	const userInstance = new userSchema(user);
	userInstance.save((err, newUser) => {
		if (err) return res.status(500).send(err);

		if (newUser) return res.json({ message: "User successfully added to database", user: newUser });
		return res.status(500).send("user name is taken");
	});
});

// Authenticate user and return token
router.post("/login", (req, res) => {
	const user = req.body;

	if (!user.userName || !user.password) res.status(400).send("Must contain user name and password");

	userSchema.findOne({ userName: user.userName }, (err, currentUser) => {
		if (err) return res.status(500).send("No such user");

		if (currentUser) {
			const passwordMatches = bcrypt.compareSync(user.password, currentUser.password);
			if (!passwordMatches) return res.status(401).send("Wrong password");
			const payload = {
				userName: user.userName,
			};

			const token = jwtSimple.encode(payload, jwtSecret);
			return res.status(201).send(token);
		}

		return res.status(500).send("No such user");
	});
});

router.delete("/:user_id", (req, res) => {
	userSchema.remove({ _id: req.params.user_id }, (err) => {
		if (err) res.send(err);
		res.json({ message: "User has been deleted" });
	});
});

module.exports = router;
