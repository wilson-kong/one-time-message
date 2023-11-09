const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

require("dotenv").config();

// Connecting to the database before each test. 
beforeEach(async () => {
    await mongoose.connect(process.env.MONG_URI);
});
  
// Closing database connection after each test. 
afterEach(async () => {
    await mongoose.connection.close();
});

// Test for GET /api/messages
describe("GET /api/messages", () => {
    describe("given there are messages", () => {
        it("should return status code 200", async () => {
            const res = await request(app).get("/api/messages");
            expect(res.statusCode).toBe(200);
        });
    });
    describe("given there are messages", () => {
        it("should return more than 0 messages.", async () => {
            const res = await request(app).get("/api/messages");
            expect(res.body.length).toBeGreaterThan(0);
        });
    });
});

// Test for POST /api/messages
describe("POST /api/messages", () => {
    describe("given there is a message", () => {
        it("should return status code 201", async () => {
            const res = await request(app).post("/api/messages").send({
                text: "Hello World."
            });
            expect(res.statusCode).toBe(201);
        });
    });
    describe("given there is a message", () => {
        it("should create a message and return status code 201", async () => {
            const res = await request(app).post("/api/messages").send({
                text: "Hello World."
            });
            expect(res.statusCode).toBe(201);
            expect(res.body.text).toBe("Hello World.");
        });
    });
    describe("given there is no message", () => {
        it("should return status code 400", async () => {
            const res = await request(app).post("/api/messages").send({});
            expect(res.statusCode).toBe(400);
        });
    });    
});

// Test for GET /api/messages/:id
describe("GET /api/messages/:id", () => {
    describe("given the message id is incorrect", () => {
        it("should return status code 404", async () => {
            const res = await request(app).get("/api/messages/12345");
            expect(res.statusCode).toBe(404);
        });
    });
    describe("given the message id is valid", () => {
        it("should return status code 200", async () => {
            const post_res = await request(app).post("/api/messages").send({
                text: "Hello World."
            });
            expect(post_res.statusCode).toBe(201);
            expect(post_res.body.text).toBe("Hello World.");
            const id = post_res.body.link;

            const res = await request(app).get("/api/messages/" + id);
            expect(res.statusCode).toBe(200);
        });
        it("should have the correct text", async () => {
            const post_res = await request(app).post("/api/messages").send({
                text: "Hello World."
            });
            expect(post_res.statusCode).toBe(201);
            expect(post_res.body.text).toBe("Hello World.");
            const text = post_res.body.text;
            expect(text).toBe("Hello World.");
        });
    });
    describe("given multiple messages are created", () => {
        it("should generate different links", async () => {
            const post_res_one = await request(app).post("/api/messages").send({
                text: "Hello, first message!"
            });
            expect(post_res_one.statusCode).toBe(201);
            
            const post_res_two= await request(app).post("/api/messages").send({
                text: "Hello, second message!"
            });
            expect(post_res_two.statusCode).toBe(201);
            
            const id_one = post_res_one.body.link;
            const id_two = post_res_two.body.link;
            expect(id_one).not.toBe(id_two);
        });
        it("should access the correct messages", async () => {
            const post_res_one = await request(app).post("/api/messages").send({
                text: "Hello, first message!"
            });
            expect(post_res_one.statusCode).toBe(201);
            
            const post_res_two= await request(app).post("/api/messages").send({
                text: "Hello, second message!"
            });
            expect(post_res_two.statusCode).toBe(201);
            
            const text_one = post_res_one.body.text;
            expect(text_one).toBe("Hello, first message!");
            const text_two = post_res_two.body.text;
            expect(text_two).toBe("Hello, second message!"); 
        });
    });

    describe("given the message has been accessed", () => {
        it("should return status code 404", async () => {
            const post_res = await request(app).post("/api/messages").send({
                text: "Hello World."
            });
            expect(post_res.statusCode).toBe(201);
            expect(post_res.body.text).toBe("Hello World.");
            const id = post_res.body.link;

            const res = await request(app).get("/api/messages/" + id);
            expect(res.statusCode).toBe(200);
            const second_res = await request(app).get("/api/messages/" + id);
            expect(second_res.statusCode).toBe(404);
        });
    });
});