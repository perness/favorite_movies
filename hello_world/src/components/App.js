import React, { Component } from "react";
import { connect } from "react-redux";
import MovieTable from "./MovieTable";
import LogInForm from "./LogInForm";
import Inspiration from "./Inspiration";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentRoute: "loginForm",
		};
	}

	routes = {
		loginForm: <LogInForm goTo={this.goTo.bind(this)} />,
		movieTable: <MovieTable goTo={this.goTo.bind(this)} />,
		inspiration: <Inspiration goTo={this.goTo.bind(this)} />,
	};

	goTo(newRoute) {
		switch (newRoute) {
		case "movieTable":
			if (localStorage.getItem("token")) {
				this.setState({
					currentRoute: newRoute,
				});
			}
			break;
		case "inspiration":
			if (localStorage.getItem("token")) {
				this.setState({
					currentRoute: newRoute,
				});
			}
			break;
		default:
			this.setState({
				currentRoute: "loginForm",
			});
		}
	}

	render() {
		return (
			<div>
				{this.routes[this.state.currentRoute]}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps, null)(App);
