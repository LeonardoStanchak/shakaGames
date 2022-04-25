const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    nome: String,
    valor: Number,
    vendido: Boolean,
})

module.exports = Person