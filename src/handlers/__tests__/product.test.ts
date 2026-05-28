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

    it('should display validation errors', async () => {
        const response = await supertest(server).post('/api/products').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).toBe(404)
        expect(response.body.errors).toHaveLength(2)
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
        expect(response.body).not.toHaveProperty('error')

        console.log(response.status)
    })
})