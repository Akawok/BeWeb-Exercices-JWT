const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// ===== AUTOMATISATION DU POST & DU GET =====
setInterval(()=>{
    axios.post('http://localhost:3000/login', {
        username: 'john',
        password: 'password123admin'
    })
    .then(res=>{
        // console.log(res.data.accessToken)
        // console.log(res.data)
        axios.get('http://localhost:4000/books', {
        headers: {"Authorization" : `Bearer ${res.data.accessToken}`}
        })
        .then(res=>{
            console.log(res.data);
        })
        .catch(err =>{
            console.error(err);
        })
    })
    .catch(err =>{
        console.error(err);
    })
}, 5000, 0)

// ===== AJOUT AUTOMATIQUE DE LIVRES=====
setInterval(() =>{
    axios.post('http://localhost:3000/login', {
        username: 'john',
        password: 'password123admin'
    })
    .then(res=>{
        axios.post('http://localhost:4000/books',{
            author: new Date().getTime(),
            country: new Date().getTime(),
            language: new Date().getTime(),
            pages: new Date().getTime(),
            title: new Date().getTime(),
            year: new Date().getTime()
        },
        {
            headers: {"Authorization" : `Bearer ${res.data.accessToken}`
        }
        })
        .then(res=>{
            console.log(res.config.data)
        })
        .catch(err =>{
            console.error(err)
        })
    })
    .catch(err =>{
        console.error(err);
    })
}, 6000, 0)

// ===== ECOUTE DU PORT 5000 =====
app.listen(5000, () => {
    console.log('Bot running on http://localhost:5000');
});