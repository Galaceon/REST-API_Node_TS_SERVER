import server from "../server";
import supertest from "supertest";

describe('GET /api', () => {
    it('should send back a json response', async () => {
        const res = await supertest(server).get('/api')

        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('Desde API')

        console.log(res.body.msg)
    })
})