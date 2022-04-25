// Configurações Iniciais
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//Forma de ler o JSON
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
//Rotas da API
const jogosRoutes = require('./routes/jogosRoutes')

app.use('/jogos', jogosRoutes)
//Rota inicial / endpoint
app.get('/', (req, res) => {
    res.json({
        menssagem: 'Ola mundo Primeiro end point'
    })
})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)


mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.getuk.mongodb.net/shakaGames?retryWrites=true&w=majority`,
    )
    .then(() => {
        console.log('Conectamos ao mongoDB')
        app.listen(3000)
    })
    .catch((err) => console.error(err))