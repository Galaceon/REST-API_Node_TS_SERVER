import express from 'express'

const server = express()

//Routing
server.get('/', (req, res) => {

    const datos = [
        {id: 1, nombre: 'Anto'},
        {id:2, nombre: 'Juan'}
    ]

    res.json(datos)
})

export default server