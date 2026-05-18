import express from 'express'
import router from './router'
import db from './config/db'

// Conectar a DB
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log('conexion exitosa a la db')
    } catch(error) {
        console.log(error)
        console.log('Hubo un error al conectarse a la db')
    }
}

connectDB()

const server = express()

server.use('/api/products', router)

export default server