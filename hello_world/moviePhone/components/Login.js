import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, Button, AsyncStorage } from "react-native";
import config from "../config/config";

const url = `${config.nativeDatabaseURL}/users`;

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: "",
			password: "",
		};
		this.onPress = this.onPress.bind(this);
	}

	onPress() {
		const userName = this.state.userName;
		const password = this.state.password;

		if (!userName || !password) {
			return;
		}

		fetch(`${url}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userName, password }),
		})
			.then(res => res.text())
			.then((token) => {
				AsyncStorage.setItem("token", token);
				this.props.goTo("movieList");
			})
			.catch((err) => {
				console.error(err);
			});
	}

	render() {
		return (
			<View>
				<Text style={styles.text}>User name:</Text>
				<TextInput
					style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
					onChangeText={userName => this.setState({ userName })}
					value={this.state.userName}
				/>
				<Text style={styles.text}>Password:</Text>
				<TextInput
					style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
					onChangeText={password => this.setState({ password })}
					value={this.state.password}
				/>
				<Button
					style={styles.button}
					onPress={this.onPress}
					title="Login"
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#0c0ef3",
		borderRadius: 2,
	},
	text: {
		color: "#000000",
		fontWeight: "500",
		padding: 8,
		textAlign: "center",
	},
});
