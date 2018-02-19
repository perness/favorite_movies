const request = require("supertest");
const server = require("../server");

let testUser = {
	userName: "testUser",
	password: "password",
};

describe("Get all users stored in DB", () => {
	it("Return all user", (done) => {
		request(server).get("/users/").then((res) => {
			expect(res.statusCode).toBe(200);
			expect(res.body).toBeTruthy();
			done();
		});
	});
});

describe("Get all movies", () => {
	it("Should deny access because of missing token", (done) => {
		request(server).get("/movies/").then((res) => {
			expect(res.statusCode).toBe(401);
			expect(res.body.message).toEqual("Must include a token");
			done();
		});
	});
});

describe("Create user", () => {
	it("Should create and return new user", (done) => {
		request(server).post("/users/").send(testUser).then((res) => {
			testUser = res.body.user;
			expect(res.statusCode).toBe(200);
			expect(testUser.userName).toBe("testUser");
			done();
		});
	});
});

describe("Delete user by ID", () => {
	it("Should return success message", (done) => {
		request(server).delete(`/users/${testUser._id}`).then((res) => {
			expect(res.statusCode).toBe(200);
			expect(res.body.message).toBe("User has been deleted");
			done();
		});
	});
});
