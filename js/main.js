'use strict'

const container = document.getElementById('container')
const btnNovoContato = document.getElementById('novo-contato')
const main = document.querySelector('main')
const cancelar = document.getElementById('cancelar')
const form = document.querySelector('form')
const btnSalvar = document.getElementById('salvar')
const campoFoto = document.getElementById('preview-image')
const campoImagem = document.getElementById('foto')

import {criarContato, lerContatos} from "./contato.js"

console.log(await lerContatos())

async function MostrarContatos() {
    const contatos = await lerContatos()

    contatos.forEach(contato => {
        
    let card = document.createElement('div')
    let img = document.createElement('img')
    let nome = document.createElement('h2')
    let numero = document.createElement('p')

    img.src = contato.foto
    nome.textContent = contato.nome
    numero.textContent = contato.celular

    container.classList.add('container')
    card.classList.add('card-contato')
    container.appendChild(card)
    card.append(img, nome, numero)
    
    })
}

async function adicionarContatos() {
    let campoNome = document.getElementById('nome')
    let campoEmail = document.getElementById('email')
    let campoCelular = document.getElementById('celular')
    let campoEndereco = document.getElementById('endereco')
    let campoCidade = document.getElementById('cidade')

    campoFoto.src = URL.createObjectURL(campoImagem.files[0])

    const contato = {
        "nome": `${campoNome.value}`,
        "celular": `${campoCelular.value}`,
        "foto": `${campoFoto.src}`,
        "email": `${campoEmail.value}`,
        "endereco": `${campoEndereco.value}`,
        "cidade": `${campoCidade.value}`

    }

    const criarContatos = await criarContato(contato)
    return criarContatos
    
}

await MostrarContatos()

btnNovoContato.addEventListener('click', async () =>{

    container.textContent = ''
    main.classList.add('form-show')
})

cancelar.addEventListener('click', async() =>{

    form.textContent = ''
    await MostrarContatos()
})

btnSalvar.addEventListener('click', async() =>{

    await adicionarContatos()
})

campoImagem.addEventListener('change', async () =>{

    campoFoto.src = URL.createObjectURL(campoImagem.files[0])

})
