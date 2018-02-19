import React, { Component } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import axios from "axios";

export default class MovieItem extends Component {
	constructor(props) {
		super(props);
		this.onPress = this.onPress.bind(this);
	}

	onPress() {
		axios.delete(`${this.props.url}/${this.props.uniqueID}`)
			.catch((err) => {
				console.log(err);
			})
			.then(this.props.removeDeletedMovieFromList);
	}

	render() {
		return (
			<View>
				<Text style={styles.text}>Movie title: {JSON.stringify(this.props.title)}</Text>
				<Text style={styles.text}>Release date: {JSON.stringify(this.props.releaseDate)}</Text>
				<Button
					style={styles.button}
					onPress={this.onPress}
					title="Delete movie"
				/>
			</View>
		);
	}
}

MovieItem.propTypes = {
	url: PropTypes.string,
	uniqueID: PropTypes.string,
	removeDeletedMovieFromList: PropTypes.func,
	title: PropTypes.string,
	releaseDate: PropTypes.number,
};

MovieItem.defaultProps = {
	url: null,
	uniqueID: null,
	removeDeletedMovieFromList: null,
	title: null,
	releaseDate: null,
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#f30000",
		borderRadius: 2,
	},
	text: {
		color: "#000000",
		fontWeight: "500",
		padding: 8,
		textAlign: "center",
	},
});
