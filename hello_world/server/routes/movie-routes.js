const router = require("express").Router();
const movieModel = require("../../models/movie");
const config = require("../config/config");
const jwtSimple = require("jwt-simple");

router.get("/", (req, res) => {
	const token = req.header("Authorization");
	const payload = jwtSimple.decode(token, config.jwtSecret);
	const userName = payload.userName;

	movieModel.find({ userName: userName }).exec((err, movies) => {
		if (err) return res.status(500).send(err);
		return res.send(movies);
	});
});

router.get("/top_ten_movies", (req, res) => {
	movieModel.find({ isPublic: true }).exec((err, movies) => {
		if (err) return res.status(500).send(err);
		return res.send(movies);
	});
});
// Used for testing purposes
router.get("/native", (req, res) => {
	movieModel.find((err, movies) => {
		if (err) return res.status(500).send(err);
		return res.send(movies);
	});
});

router.patch("/:movie_id", (req, res) => {
	movieModel.findByIdAndUpdate({ _id: req.params.movie_id }, { isPublic: req.body.isPublicState }, (err, movie) => {
		if (err) return res.status(500).send(err);
		if (movie) return res.json({ message: "Movie has been updated" });
		return res.json({ message: "No movie found to update" });
	});
});

router.post("/", (req, res) => {
	const body = req.body;
	const movieInstance = new movieModel(body);

	movieInstance.save((err, savedMovie) => {
		if (err) return res.status(500).send(err);
		return res.send(savedMovie);
	});
});

router.delete("/:movie_id", (req, res) => {
	movieModel.remove({ _id: req.params.movie_id }, (err) => {
		if (err) return res.send(err);
		return res.json({ message: "Movie has been deleted" });
	});
});

module.exports = router;
