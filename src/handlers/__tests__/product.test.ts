import supertest from 'supertest'
import server, { connectDB } from '../../server'
import db from '../../config/db'

describe('POST /api/products', () => {
    beforeAll(async () => {
        await connectDB()
    })

    afterAll(async () => {
        await db.close()
    })

    it('should create a new product', async () => {
        const response = await supertest(server).post('/api/products').send({
            name : "Taza Gaming",
            price : 50
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)

        console.log(response.status)
    })
})