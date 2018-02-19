import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
import MovieList from "./components/MovieList";
import Login from "./components/Login";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentRoute: "loginForm",
		};
	}

	goTo(newRoute) {
		if ((newRoute === "movieList")) {
			try {
				const token = AsyncStorage.getItem("token");
				if (token !== null) {
					this.setState({
						currentRoute: newRoute,
					});
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			this.setState({
				currentRoute: "loginForm",
			});
		}
	}

	routes = {
		loginForm: <Login goTo={this.goTo.bind(this)} />,
		movieList: <MovieList goTo={this.goTo.bind(this)} />,
	};

	render() {
		return (
			<View>
				{this.routes[this.state.currentRoute]}
			</View>
		);
	}
}
