import server, { connectDB } from "../server";
import supertest from "supertest";
import db from "../config/db";

describe('GET /api', () => {
    it('should send back a json response', async () => {
        const res = await supertest(server).get('/api')

        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('Desde API')

        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('desde api')
        console.log(res.body.msg)
    })
})

jest.mock("../config/db")

describe('connect DB',  () => {
    it('should handle db connection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('HUBO UN ERROR AL CONECTARSE A LA DB'))

        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('HUBO UN ERROR AL CONECTARSE A LA DB')
        )
    })
})