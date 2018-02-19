import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const config = require("../config/config");

const url = `${config.databaseURL}/movies`;

class MovieForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			releaseDate: "",
			ws: null,
		};
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleReleaseDateChange = this.handleReleaseDateChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.removeToken = this.removeToken.bind(this);
		this.updateMovieList = this.updateMovieList.bind(this);
	}

	componentWillMount() {
		const webSocketURL = config.webSocketURL;
		const ws = new WebSocket(webSocketURL);

		this.setState({ ws });

		ws.onopen = () => {
			console.log("movie form socket connected");
		};

		ws.onerror = (error) => {
			console.log("movie form web socket error", error);
		};
	}

	handleTitleChange(e) {
		this.setState({ title: e.target.value });
	}

	handleReleaseDateChange(e) {
		this.setState({ releaseDate: e.target.value });
	}

	handleSubmit() {
		const title = this.state.title.trim();
		const releaseDate = this.state.releaseDate;
		const date = new Date();
		if (!title || !releaseDate) {
			return;
		}

		axios.post(url, {
			title,
			releaseDate,
			userName: localStorage.userName,
			time: date.getTime(),
		}, {
			headers: {
				Authorization: localStorage.getItem("token"),
			},
		})
			.then((res) => {
				this.updateMovieList(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	removeToken() {
		localStorage.clear();
	}

	updateMovieList(newMovie) {
		console.log("new movie", newMovie);
		// this.state.ws.send(JSON.stringify(newMovie));
		this.props.addMovie(newMovie);
		this.setState({ title: "", releaseDate: "" });
	}

	render() {
		return (
			<div className="container">
				<h2>Favorite Movies</h2>
				<h3>Signed in as: {localStorage.userName}</h3>
				<button
					id="publicListBtn"
					className="btn btn-default"
					onClick={(event) => {
						this.props.goTo("inspiration");
						event.preventDefault();
					}
					}
				>Public
				</button>
				<button
					id="signOutBtn"
					className="btn btn-default"
					onClick={(event) => {
						this.removeToken();
						this.props.goTo("loginForm");
						event.preventDefault();
					}
					}
				>Sign out
				</button>
				<form
					onSubmit={(event) => {
						this.handleSubmit();
						event.preventDefault();
					}}
				>
					<div className="form-group">
						<label htmlFor="movieTitleInput">
							Movie Title
						</label>
						<input
							value={this.state.title}
							type="text"
							className="form-control"
							id="movieTitleInput"
							placeholder="Enter movie title"
							onChange={this.handleTitleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="releaseDateInput">
							Release Date
						</label>
						<input
							value={this.state.releaseDate}
							type="number"
							id="releaseDateInput"
							className="form-control"
							placeholder="Enter release date"
							min="1900"
							max="2020"
							onChange={this.handleReleaseDateChange}
						/>
					</div>
					<button
						id="addMovieBtn"
						type="submit"
						className="btn btn-default"
						value="Post"
						onClick={() => this.updateMovieList}

					>
						Add Movie
					</button>
				</form>
			</div>
		);
	}
}

MovieForm.propTypes = {
	addMovie: PropTypes.func,
	goTo: PropTypes.func,
};

MovieForm.defaultProps = {
	addMovie: null,
	goTo: null,
};

export default MovieForm;
