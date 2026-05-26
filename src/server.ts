import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'

// Conectar a DB
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.bold.green('CONEXIÓN EXITOSA A LA DB'))
    } catch(error) {
        // console.log(error)
        console.log(colors.bold.red('HUBO UN ERROR AL CONECTARSE A LA DB'))
    }
}

connectDB()

//Instancia de Express
const server = express()

// Leer datos de formularios
server.use(express.json())

server.use('/api/products', router)

server.get('/api', (req, res) => {
    res.json({msg: 'Desde API'})
})

export default server