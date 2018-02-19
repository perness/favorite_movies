import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, Button, AsyncStorage } from "react-native";
import axios from "axios";
import MovieItem from "./MovieItem";
import config from "../config/config";

const url = `${config.nativeDatabaseURL}/movies`;

export default class MovieList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: [],
		};
		this.loadMovies = this.loadMovies.bind(this);
		this.onPress = this.onPress.bind(this);
	}

	componentDidMount() {
		this.loadMovies();
	}

	async onPress() {
		try {
			await AsyncStorage.removeItem("token");
		} catch (err) {
			console.error(err);
		}

		this.props.goTo("loginForm");
	}

	async loadMovies() {
		try {
			const token = await AsyncStorage.getItem("token");
			if (token !== null) {
				axios.get(url, { headers: { Authorization: token } })
					.then((res) => { this.setState({ data: res.data }); })
					.catch((err) => {
						console.log(err, err);
					});
			}
		} catch (error) {
			console.error(error);
		}
	}
	keyExtractor = (item, index) => item.id;

	render() {
		return (
			<View>
				<Text textAlign={"center"}>Favorite Movies</Text>
				<Button
					style={styles.button}
					onPress={this.onPress}
					title="Logout"
				/>
				<FlatList
					data={this.state.data}
					keyExtractor={this.keyExtractor}
					renderItem={({ item }) =>
						(<MovieItem
							key={item._id}
							title={item.title}
							releaseDate={item.releaseDate}
							url={url}
							uniqueID={item._id}
							removeDeletedMovieFromList={() => {
								const id = item._id;
								const moviesWithoutRemovedItem = this.state.data.filter(m => m._id !== id);
								this.setState({ data: moviesWithoutRemovedItem });
							}}
						/>)
					}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF",
	},
	welcome: {
		fontSize: 20,
		textAlign: "center",
		margin: 10,
	},
	instructions: {
		textAlign: "center",
		color: "#333333",
		marginBottom: 5,
	},
	button: {
		backgroundColor: "#f30000",
		borderRadius: 2,
	},
});
