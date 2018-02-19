const chai = require("chai");
const mongoose = require("mongoose");
const sinon = require("sinon");
const MovieModel = require("../../models/movie");
require("sinon-mongoose");

const expect = chai.expect;


describe("Get all movies", () => {
	it("Should return all stored movies", (done) => {
		const mockMovie = sinon.mock(MovieModel);
		const expectedResult = { status: true, users: [] };
		mockMovie.expects("find").yields(null, expectedResult);
		MovieModel.find((err, res) => {
			mockMovie.verify();
			mockMovie.restore();
			expect(res.status).to.be.true;
			done();
		});
	});
});

describe("Failed to get all movies", () => {
	it("Should return error", (done) => {
		const mockMovie = sinon.mock(MovieModel);
		const expectedResult = { status: false, error: "Something went wrong" };
		mockMovie.expects("find").yields(expectedResult, null);
		MovieModel.find((err, res) => {
			mockMovie.verify();
			mockMovie.restore();
			expect(err.status).to.not.be.true;
			done();
		});
	});
});

describe("Add new movie", () => {
	it("Should return success message", (done) => {
		const mockMovie = sinon.mock(new MovieModel({ user: "Save new movie from mock" }));
		const movie = mockMovie.object;
		const expectedResult = { status: true };
		mockMovie.expects("save").yields(null, expectedResult);
		movie.save((err, res) => {
			mockMovie.verify();
			mockMovie.restore();
			expect(res.status).to.be.true;
			done();
		});
	});
});

describe("Add new movie failed", () => {
	it("Should return error message", (done) => {
		const mockMovie = sinon.mock(new MovieModel({ user: "Save new movie from mock" }));
		const movie = mockMovie.object;
		const expectedResult = { status: false };
		mockMovie.expects("save").yields(expectedResult, null);
		movie.save((err, res) => {
			mockMovie.verify();
			mockMovie.restore();
			expect(err.status).to.not.be.true;
			done();
		});
	});
});

describe("Delete movie with ID", () => {
	it("Should return success message", (done) => {
		const mockMovie = sinon.mock(MovieModel);
		const expectedResult = { status: true };
		mockMovie.expects("remove").withArgs({ _id: 12345 }).yields(null, expectedResult);
		MovieModel.remove({ _id: 12345 }, (err, res) => {
			mockMovie.verify();
			mockMovie.restore();
			expect(res.status).to.be.true;
			done();
		});
	});
});

describe("Delete movie with ID failed", () => {
	it("Should return error message", (done) => {
		const mockMovie = sinon.mock(MovieModel);
		const expectedResult = { status: false };
		mockMovie.expects("remove").withArgs({ _id: 12345 }).yields(expectedResult, null);
		MovieModel.remove({ _id: 12345 }, (err, res) => {
			mockMovie.verify();
			mockMovie.restore();
			expect(err.status).to.not.be.true;
			done();
		});
	});
});
