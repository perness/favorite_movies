const chai = require("chai");
const mongoose = require("mongoose");
const sinon = require("sinon");
const UserModel = require("../../models/user");
require("sinon-mongoose");

const expect = chai.expect;

describe("Get all users", () => {
	it("Should return all stored users", (done) => {
		const mockUser = sinon.mock(UserModel);
		const expectedResult = { status: true, users: [] };
		mockUser.expects("find").yields(null, expectedResult);
		UserModel.find((err, res) => {
			mockUser.verify();
			mockUser.restore();
			expect(res.status).to.be.true;
			done();
		});
	});
});

describe("Failed to get all users", () => {
	it("Should return error", (done) => {
		const mockUser = sinon.mock(UserModel);
		const expectedResult = { status: false, error: "Something went wrong" };
		mockUser.expects("find").yields(expectedResult, null);
		UserModel.find((err, res) => {
			mockUser.verify();
			mockUser.restore();
			expect(err.status).to.not.be.true;
			done();
		});
	});
});

describe("Add new user", () => {
	it("Should return success message", (done) => {
		const mockUser = sinon.mock(new UserModel({ user: "Save new user from mock" }));
		const user = mockUser.object;
		const expectedResult = { status: true };
		mockUser.expects("save").yields(null, expectedResult);
		user.save((err, res) => {
			mockUser.verify();
			mockUser.restore();
			expect(res.status).to.be.true;
			done();
		});
	});
});

describe("Add new user failed", () => {
	it("Should return error message", (done) => {
		const mockUser = sinon.mock(new UserModel({ user: "Save new user from mock" }));
		const user = mockUser.object;
		const expectedResult = { status: false };
		mockUser.expects("save").yields(expectedResult, null);
		user.save((err, res) => {
			mockUser.verify();
			mockUser.restore();
			expect(err.status).to.not.be.true;
			done();
		});
	});
});

describe("Delete user with ID", () => {
	it("Should return success message", (done) => {
		const mockUser = sinon.mock(UserModel);
		const expectedResult = { status: true };
		mockUser.expects("remove").withArgs({ _id: 12345 }).yields(null, expectedResult);
		UserModel.remove({ _id: 12345 }, (err, res) => {
			mockUser.verify();
			mockUser.restore();
			expect(res.status).to.be.true;
			done();
		});
	});
});

describe("Delete user with ID failed", () => {
	it("Should return error message", (done) => {
		const mockUser = sinon.mock(UserModel);
		const expectedResult = { status: false };
		mockUser.expects("remove").withArgs({ _id: 12345 }).yields(expectedResult, null);
		UserModel.remove({ _id: 12345 }, (err, res) => {
			mockUser.verify();
			mockUser.restore();
			expect(err.status).to.not.be.true;
			done();
		});
	});
});
