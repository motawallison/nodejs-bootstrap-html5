const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senha@1',
    port: 3306,
    database: 'ecommerce',
    multipleStartements: true
});

db.connect((erro) => {
    if(erro){
        throw erro;
    }
    console.log(`Conectado ao banco de dados ecommerce`)
})

global.db = db;

module.exports = db;