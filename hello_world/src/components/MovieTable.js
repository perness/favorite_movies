import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MovieItem from "./MovieItem";
import MovieForm from "./MovieForm";
import Search from "./Search";


const config = require("../config/config");

const url = config.movieDataBaseUrl;

class MovieTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			searchQuery: "",
		};
		this.loadMovies = this.loadMovies.bind(this);
		this.addMovie = this.addMovie.bind(this);
	}

	componentDidMount() {
		this.loadMovies();
	}

	loadMovies() {
		axios.get(url, { headers: { Authorization: localStorage.getItem("token") } })
			.then((res) => { this.setState({ data: res.data }); })
			.catch((err) => { console.log("err", err); });
	}

	addMovie(newMovie) {
		const movie = newMovie;
		const array = this.state.data;
		array.push(movie);
		this.setState({ data: array });
	}

	render() {
		return (
			<div className="container">
				<MovieForm
					addMovie={this.addMovie}
					goTo={this.props.goTo}
				/>
				<Search
					onSearch={query => this.setState({
						searchQuery: query,
					})}
				/>
				<table className="table table-hover" id="movieTable">
					<thead>
						<tr id="movieTableRow">
							<th>Title</th>
							<th>Release Date</th>
							<th>Public</th>
						</tr>
					</thead>
					<tbody>
						{this.state.data.filter(currentMovie =>
							currentMovie.title.includes(this.state.searchQuery))
							.map(currentMovie => (
								<MovieItem
									movieTitle={currentMovie.title}
									movieReleaseDate={currentMovie.releaseDate}
									key={currentMovie._id}
									uniqueID={currentMovie._id}
									userName={currentMovie.userName}
									time={currentMovie.time}
									isPublic={currentMovie.isPublic}
									removeDeletedMovieFromList={() => {
										const id = currentMovie._id;
										const moviesWithoutRemovedItem = this.state.data.filter(m => m._id !== id);
										this.setState({ data: moviesWithoutRemovedItem });
									}}
									url={url}
								/>
							))}
					</tbody>
				</table>
			</div>
		);
	}
}

MovieTable.propTypes = {
	data: PropTypes.array,
	goTo: PropTypes.func,
};

MovieTable.defaultProps = {
	data: null,
	goTo: null,
};

function mapStateToProps(state) {
	return {
		testMovie: state.allMovies,
	};
}

export default connect(mapStateToProps, null)(MovieTable);
