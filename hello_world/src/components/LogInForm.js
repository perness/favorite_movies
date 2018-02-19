import React, { Component } from "react";
import RegisterForm from "./RegisterForm";
import axios from "axios";
import PropTypes from "prop-types";
import config from "../config/config";

const url = `${config.databaseURL}/users`;

class LogInForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: "",
			password: "",
		};
		this.handleUserNameChange = this.handleUserNameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleUserNameChange(e) {
		this.setState({ userName: e.target.value.trim() });
	}

	handlePasswordChange(e) {
		this.setState({ password: e.target.value.trim() });
	}

	handleSubmit() {
		const userName = this.state.userName;
		const password = this.state.password;

		if (!userName || !password) {
			return;
		}

		axios.post(`${url}/login`, { userName, password })
			.then((res) => {
				localStorage.setItem("token", res.data);
				localStorage.setItem("userName", userName);
				this.props.goTo("movieTable");
			})
			.catch((err) => {
				console.error("loginForm.js -> handleSubmit():", err.message);
				window.alert("Wrong user name or password");
			});
		this.setState({ userName: "", password: "" });
	}

	render() {
		return (
			<div className="container">
				<h2>Sign in</h2>
				<form onSubmit={(e) => {
					this.handleSubmit();
					e.preventDefault();
				}}
				>
					<div>
						<label>User name</label>
						<input
							value={this.state.userName}
							type="text"
							className="form-control"
							id="username"
							minLength={3}
							maxLength={20}
							placeholder="Enter user name"
							onChange={this.handleUserNameChange}
						/>
					</div>
					<div>
						<label>Password</label>
						<input
							value={this.state.password}
							type="password"
							className="form-control"
							id="password"
							minLength={4}
							maxLength={30}
							placeholder="Enter password"
							onChange={this.handlePasswordChange}
						/>
					</div>
					<button
						id="logInBtn"
						type="submit"
						value="Post"
						className="btn btn-default"
					>Sign in
					</button>
				</form>
				<RegisterForm />
			</div>
		);
	}
}

LogInForm.propTypes = {
	goTo: PropTypes.func,
};

LogInForm.defaultProps = {
	goTo: null,
};

export default LogInForm;
