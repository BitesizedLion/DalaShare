const request = require("supertest")
const app = require("../../src/index.js");

const testImage = "./test/files/Test.png";

afterAll(async () => {
	await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});

describe("POST /save/:name", () => {
    it("should upload and save the image and return name without extension", async () => {
        const res = await request(app)
            .post("/save/Test.png")
            .set("token", "ufocoolaf")
            .attach("files[]", testImage);

        expect(res.statusCode).toEqual(200)
        expect(res.body).toStrictEqual({ name: "Test" })
    });
});