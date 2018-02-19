import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const config = require("../config/config");

const url = config.movieDataBaseUrl;

const MovieItemComponent = props => (
	<tr>
		<td>{JSON.stringify(props.movieTitle)}</td>
		<td>{JSON.stringify(props.movieReleaseDate)}</td>
		<td>{JSON.stringify(props.userName)}</td>
	</tr>
);

class Inspiration extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			ws: null,
		};
		this.loadMovies = this.loadMovies.bind(this);
		this.editMovieList = this.editMovieList.bind(this);
		this.connectWebSocket = this.connectWebSocket.bind(this);
		this.editDataArray = this.editDataArray.bind(this);
		this.filterTopTen = this.filterTopTen.bind(this);
	}

	componentWillMount() {
		this.connectWebSocket();
		this.loadMovies();
	}

	componentWillUnmount() {
		this.state.ws.close();
	}

	connectWebSocket() {
		const webSocketURL = config.webSocketURL;
		const ws = new WebSocket(webSocketURL);

		this.setState({ ws });

		ws.onopen = () => console.log("inspiration socket connected");

		ws.onerror = error => console.log("inspiration web socket error", error);

		ws.onmessage = (event) => {
			const response = JSON.parse(event.data);
			this.editMovieList(response);
		};

	}

	editMovieList(data) {
		if (!data.isPrivate) {
			console.log("length bool", this.state.data.length > 9);
			if (this.state.data.length > 9) {
				this.editDataArray(data);
			} else {
				const newData = [...this.state.data, data];
				newData.sort((a, b) => b.time - a.time);
				this.setState({ data: newData });
			}
		} else {
			const newData = this.state.data.filter(items => items._id !== data._id);
			this.setState({ data: newData });
		}
	}

	editDataArray(data) {
		const temp = [...this.state.data];
		temp[9] = data;
		temp.sort((a, b) => b.time - a.time);
		this.setState({ data: temp });
	}

	loadMovies() {
		axios.get(`${url}/top_ten_movies`, { headers: { Authorization: localStorage.getItem("token") } })
			.then((res) => { this.filterTopTen(res.data); })
			.catch((err) => { console.log(err, err); });
	}

	filterTopTen(movies) {
		movies.sort((a, b) => b.time - a.time);
		if (movies.length > 9) {
			const temp = movies.slice(0, 10);
			this.setState({ data: temp });
		} else {
			this.setState({ data: movies });
		}
	}

	render() {
		return (
			<div className="container">
				<h3>Signed in as: {localStorage.userName}</h3>
				<button
					id="privateListBtn"
					className="btn btn-default"
					onClick={(event) => {
						this.props.goTo("movieTable");
						event.preventDefault();
					}
					}
				>Private
				</button>
				<h3>Top Ten Movies</h3>
				<table className="table table-hover" id="movieTable">
					<thead>
						<tr id="movieTableRow">
							<th>Title</th>
							<th>Release Date</th>
							<th>User Name</th>
						</tr>
					</thead>
					<tbody>
						{this.state.data.map(currentMovie => (
							<MovieItemComponent
								movieTitle={currentMovie.title}
								movieReleaseDate={currentMovie.releaseDate}
								userName={currentMovie.userName}
								key={currentMovie._id}
							/>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

Inspiration.propTypes = {
	goTo: PropTypes.func,
};

Inspiration.defaultProps = {
	goTo: null,
};

export default Inspiration;
