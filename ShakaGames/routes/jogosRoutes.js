const router = require('express').Router()
const Person = require('../models/Person')

router.post('/', async (req, res) => {
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

//Leituda dos Dados

router.get('/', async(req, res) => {
    try {
        const colecao = await Person.find()

        res.status(200).json(colecao)
    } catch (error) {
        res.status(500).json({message:"Falha ao trazer as informações"})
    }
})

router.get('/:id', async(req, res) => {
    const id = req.params.id

    try {
        const jogo = await Person.findOne({_id:id})

        if(!jogo){
            res.status(424).json({message : 'Falha o o produto procurado não foi encontrado'})
            return;
        }

        res.status(200).json(jogo)
    } catch (error) {
        res.status(500).json({message:"Falha ao localizar o jogo", id})
    }
})

//Put 
router.patch('/:id', async(req, res) => {
    const id = req.params.id;
    const{vendido} = req.body

    const person = {
        vendido
    }
    try {

        const UpdateVendas = await Person.updateOne({_id:id}, person)

        if(UpdateVendas.matchedCount === 0){
            res.status(422).json({message: 'Jogo não atualizado'})
        }

        res.status(200).json(person)
        
    } catch (error) {
        res.status(500).json({message: "Não é possivel atualizar o status"})
    }
    
})

//Deletar dados da tabela

router.delete('/:id', async(req, res) => {
    const id = req.params.id

    const person = await Person.findOne({_id:id})

    if(!person){
        res.status(422).json({message : 'Jogo nao localizado e nao deletado'})
        return
    }

    try {
        await Person.deleteOne({_id:id})

        res.status(200).json('Delecao concluida')
    } catch (error) {
        res.status(500).json({message: "Erro ao deletar dados"})
    }


})
module.exports = router