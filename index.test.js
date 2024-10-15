const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");


describe('./musicians endpoint', () => {
    test("Testing endpoint existence", async () => {
        // get request for endpoint validity
        const response = await request(app).get("/musicians");
    })
    test("Testing endpoint response status", async () => {
        // get request for endpoint success status
        const response = await request(app).get("/musicians");
        expect(response.statusCode).toBe(200);
    })
    test("Testing endpoint response contents", async () => {
        // get request, parsing response from HTML -> JSON, expecting for each musician instance to equal seed data
        const response = await request(app).get("/musicians");
        const responseData = JSON.parse(response.text);
        responseData.forEach((musician, index) => {
            expect(musician.name).toEqual(seedMusician[index].name);
            expect(musician.instrument).toEqual(seedMusician[index].instrument);
    })
})
})
