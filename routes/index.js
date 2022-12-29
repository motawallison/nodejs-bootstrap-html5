var express = require('express');
var db = require('../util/db');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('index.ejs')
})

router.get('/todosProdutos', (req, res) => {
  db.query('SELECT * FROM produtos ORDER BY nome, preco', [], (erro, listagem) => {
    if(erro){
      res.status(200).send(erro)
    }
    res.render('todosProdutos.ejs', {lista: listagem})
  }) 
})

router.get('/cadastrarProduto', (req, res) => {
  res.render('addProduto.ejs', {produto:{}})
})


router.post('/addProduto', (req, res) => {
  db.query('INSERT INTO produtos(nome, preco) VALUES(?, ?)', [req.body.nome, req.body.preco], 
  function(erro){
    if(erro){
      res.status(200).send('Erro: ' + erro)
    }
    res.redirect('/todosProdutos')
  })

})

router.get('/editar/:id', (req, res) => {
  db.query('SELECT * FROM produtos WHERE id = ?', [req.params.id], function(erro, resultado){
    if(erro){
      res.status(200).send('Erro: ' + erro)
    }
    res.render('addProduto.ejs', {produto : resultado[0]})
  })
})

router.post('/edit/:id', (req, res) => {
  db.query('UPDATE produtos SET nome = ?, preco = ? WHERE id = ?', [req.body.nome, req.body.preco, req.params.id], 
  function(erro){
    if(erro){
      res.status(200).send('Erro: ' + erro)
    }
    res.redirect('/todosProdutos')
  })
})

module.exports = router;
