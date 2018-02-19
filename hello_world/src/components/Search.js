import React, { Component } from "react";

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = { searchWord: "" };
	}

	render() {
		return (
			<div className="container">
				<input
					type="text"
					className="form-control"
					placeholder="Search"
					onChange={e => this.props.onSearch(e.target.value)}
				/>
			</div>
		);
	}
}

export default Search;
