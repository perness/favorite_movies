import React, { Component } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { connect } from "react-redux";

const config = require("../config/config");

const url = `${config.databaseURL}/users`;

class RegisterForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: "",
			password: "",
			repassword: "",
		};
		this.handleUserNameChange = this.handleUserNameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleReenterPasswordChange = this.handleReenterPasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleUserNameChange(e) {
		this.setState({ userName: e.target.value.trim() });
	}

	handlePasswordChange(e) {
		this.setState({ password: e.target.value.trim() });
	}

	handleReenterPasswordChange(e) {
		this.setState({ repassword: e.target.value.trim() });
	}

	handleSubmit() {
		const userName = this.state.userName;
		let password = this.state.password;
		const repassword = this.state.repassword;

		if (!userName || !password || !repassword) return window.alert("All fields must be filled correct");
		if (password !== repassword) return window.alert("Password and repeated password must be same");

		password = bcrypt.hashSync(password, 10);

		axios.post(url, { userName, password })
			.then(() => window.alert("User successfully added"))
			.catch((err) => {
				console.log(err);
				window.alert("User name is taken");
			});
		this.setState({ userName: "", password: "", repassword: "" });
	}

	render() {
		return (
			<div className="container">
				{}
				<h2>Register</h2>
				<form onSubmit={(event) => {
					this.handleSubmit();
					event.preventDefault();
				}}
				>
					<div>
						<label>User name</label>
						<input
							value={this.state.userName}
							type="text"
							className="form-control"
							id="usernameInput"
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
							id="passwordInput"
							minLength={4}
							maxLength={30}
							placeholder="Enter password"
							onChange={this.handlePasswordChange}
						/>
					</div>
					<div>
						<label>Reenter Password</label>
						<input
							value={this.state.repassword}
							type="password"
							className="form-control"
							id="reenterPasswordInput"
							minLength={4}
							maxLength={30}
							placeholder="Enter password again"
							onChange={this.handleReenterPasswordChange}
						/>
					</div>
					<button
						id="signUpBtn"
						type="submit"
						value="Post"
						className="btn btn-default"
					>Sign up
					</button>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		allMovies: state.allMovies,
	};
}

export default connect(mapStateToProps, null)(RegisterForm);
