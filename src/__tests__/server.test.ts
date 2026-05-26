import server from "../server";
import supertest from "supertest";

describe('GET /api', () => {
    it('should send back a json response', async () => {
        const res = await supertest(server).get('/api')

        console.log(res)
    })
})