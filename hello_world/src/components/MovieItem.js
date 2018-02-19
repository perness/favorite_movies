import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const config = require("../config/config");

const movieURL = config.movieDataBaseUrl;

class MovieItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isChecked: this.props.isPublic || false,
			ws: null,
		};
		this.handleMovieDelete = this.handleMovieDelete.bind(this);
		this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
		this.updateMovieIsPublicStatus = this.updateMovieIsPublicStatus.bind(this);
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

	handleMovieDelete() {
		axios.delete(`${movieURL}/${this.props.uniqueID}`, {
			headers: { Authorization: localStorage.token },
		})
			.catch((err) => {
				console.log(err);
			})
			.then(this.props.removeDeletedMovieFromList);
	}

	handleCheckBoxChange() {
		this.setState({ isChecked: !this.state.isChecked });
		this.updateMovieIsPublicStatus();

		const payload = {
			title: this.props.movieTitle,
			releaseDate: this.props.movieReleaseDate,
			userName: this.props.userName,
			time: this.props.time,
			_id: this.props.uniqueID,
			isPrivate: this.state.isChecked,
		};
		this.state.ws.send(JSON.stringify(payload));
	}

	updateMovieIsPublicStatus() {
		axios.patch(`${movieURL}/${this.props.uniqueID}`, { isPublicState: !this.state.isChecked }, { headers: { Authorization: localStorage.token } })
			.then(res => console.log("patch res", res))
			.catch(err => console.log("patch err", err));
	}

	render() {
		return (
			<tr>
				<td>{JSON.stringify(this.props.movieTitle)}</td>
				<td>{JSON.stringify(this.props.movieReleaseDate)}</td>
				<td>
					<input
						type="checkbox"
						checked={this.state.isChecked}
						onChange={() => this.handleCheckBoxChange()}
					/>
				</td>
				<td>
					<button
						type="button"
						className="btn btn-default"
						onClick={this.handleMovieDelete}
					>Remove
					</button>
				</td>
			</tr>
		);
	}
}

MovieItem.propTypes = {
	uniqueID: PropTypes.string,
	removeDeletedMovieFromList: PropTypes.func,
	movieTitle: PropTypes.string,
	userName: PropTypes.string,
	movieReleaseDate: PropTypes.number,
	time: PropTypes.number,
	isPublic: PropTypes.bool,
};

MovieItem.defaultProps = {
	uniqueID: null,
	removeDeletedMovieFromList: null,
	movieTitle: null,
	movieReleaseDate: null,
	userName: null,
	time: null,
	isPublic: null,
};

export default MovieItem;
