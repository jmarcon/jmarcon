---
Author : "Juliano Marcon"
categories : ["Software", "Node", "Cassandra"]
comment : true
date : "2016-03-22T17:19:31-03:00"
lastMod : "2016-03-22T15:42:00-03:00"
layout: post
tags : ["Node", "API"]
title : "Node e Cassandra - Parte 3 : Criando uma API Simples"
highlight : true
img : "posts/nodejs.jpg"
image : "posts/nodejs.jpg"
---

Este é o terceiro e último de três posts sobre como criar uma API utilizando o
[NodeJS](https://nodejs.org) e o [Apache Cassandra](https://cassandra.apache.org).

Nos posts anteriores deixamos o ambiente parcialmente preparado e criamos a
base de dados que usaremos no cassandra.
<!--more-->

Então vamos criar a aplicação dentro da pasta

> **cassandra_node > node > api**

Vamos criar nosso arquivo **package.json** que definirá nossa aplicação e suas
dependências com o seguinte conteúdo.

~~~javascript
{
  "name" : "node-api-demo",
  "main" : "server.js",
  "dependencies" : {
    "express" : "~4.9.0",
    "body-parser" : "~1.8.1",
    "async" : "1.5.2",
    "cassandra-driver" : "~3.0.1"
  }
}
~~~

Inicie um arquivo **server.js** e insira o conteúdo abaixo:

~~~javascript
var cassandra  = require('cassandra-driver');
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// Configurar o App para usar o body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Definindo a porta padrão (Lembre do docker-compose.yml)
var port = process.env.PORT || 3000;

// Criando nosso cliente de conexão.
var client = new cassandra.Client({
  contactPoints: ['192.168.99.100'],
  keyspace: 'demo'
});

// Conectando no banco de dados
client.connect(function(err) {
  console.log(err);
});


// Definindo a rotas para nossa API
var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'Wohooo!!! Bem vindo a nossa API' });
});

router.post('/login', function(req, res) {
  var email = req.body.email;
  var pass = req.body.password;

  client.execute(
    "SELECT email, password FROM users " +
    "WHERE email = '" + email + "'",
    function(err, result) {
      if (err)
        res.send(err);

      var user = result.rows[0];
      if (user == null) {
        res.json({ message: 'Usuário ou senha inválidos ' });
      }
      else if (user.password != pass) {
        //Se tentar executar um WHERE diretamente no Cassandra ele apresentará
        //um erro. Não criamos um índice para a coluna password.
        res.json({ message: 'Usuário ou senha inválidos ' });
      }
      else {
        res.json({ message: user.email });
      }
    });
});

router.post('/register', function(req, res) {
  var email = req.body.email;
  var pass = req.body.password;
  var params = [email, pass];

  client.execute(
    "INSERT INTO users (email, password) values (?, ?)", params, function(err) {
      if (err)
        res.send(err);

      res.json({ message: "Cadastrado com sucesso!" });
    }
  );
});

router.get('/first', function(req, res) {
  client.execute(
    "SELECT email, password FROM users LIMIT 1",
    function(err, result) {
      if (err)
        res.send(err);

      var user = result.rows[0];
      if (user == null) {
        res.json({ message: 'Nenhum encontrado ' });
      } else {
        res.json({ message: user.email });
      }
    });
});

//Registrar nossas rotas com um prefixo api
app.use('/api', router);


//Iniciando o servidor
app.listen(port);

console.log('A Mágica acontece na porta ' + port);

~~~

Para que a aplicação node seja iniciada, vamos criar o arquivo **start.sh** na pasta
api (junto com o *server.js*) com o conteúdo abaixo:

~~~bash
#!\bin\bash

#Instalar as dependências
npm install

#Iniciar a aplicação pelo packages.json
npm start
~~~

Assim, vamos iniciar também nossa maquina docker com o comando:

~~~bash
docker-compose up -d nodejs
~~~

Utilize um utilitário como o [Postman](https://www.getpostman.com/) ou o
[Fiddler](http://www.telerik.com/fiddler) para fazer chamadas na sua API nos
endereços:

* <http://192.168.99.100:3000/api/> (GET)
* <http://192.168.99.100:3000/api/first> (GET)
* <http://192.168.99.100:3000/api/register> (POST)
* <http://192.168.99.100:3000/api/login> (POST)
