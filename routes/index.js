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

router.get('/editar/:IDPROD', (req, res) => {
  db.query('SELECT * FROM produtos WHERE IDPROD = ?', [req.params.IDPROD], function(erro, resultado){
    if(erro){
      res.status(200).send('Erro: ' + erro)
    }
    res.render('addProduto.ejs', {produto : resultado[0]})
  })
})

router.post('/edit/:IDPROD', (req, res) => {
  db.query('UPDATE produtos SET nome = ?, preco = ? WHERE IDPROD = ?', [req.body.nome, req.body.preco, req.params.IDPROD], 
  function(erro){
    if(erro){
      res.status(200).send('Erro: ' + erro)
    }
    res.redirect('/todosProdutos')
  })
})

router.delete('/delete/:IDPROD', (req, res) => {
  db.query('DELETE FROM produtos WHERE IDPROD = ?', [req.params.IDPROD], 
  function(erro){
    if(erro){
      res.status(200).send('Erro: ' + erro)
    }else{
      res.status(200).send('OK')
    }
  })
})


module.exports = router;
