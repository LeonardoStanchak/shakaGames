// Configurações Iniciais
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Person = require('./models/Person')

//Forma de ler o JSON
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
//Rotas da API
app.post('/jogo', async (req, res) => {
    //req.body
    const{nome, valor, vendido} = req.body

    if(!nome){
        res.status(422).json({message:'Precisa-se colocar o nome'})
    }

    const person = {
        nome,
        valor,
        vendido
    }

    try {
        await Person.create(person)
        res.status(201).json({menssagem :'Jogo adicionado com sucesso!'})
    } catch (error) {
        res.status(500).json({message: "falha ao adicionar"})
    }
})
//Rota inicial / endpoint
app.get('/', (req, res) => {
    res.json({
        menssagem: 'Ola mundo Primeiro end point'
    })
})

const DB_USER = 'leonardo'
const DB_PASSWORD = encodeURIComponent('leo347141')


mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.getuk.mongodb.net/shakaGames?retryWrites=true&w=majority`,
    )
    .then(() => {
        console.log('Conectamos ao mongoDB')
        app.listen(3000)
    })
    .catch((err) => console.error(err))