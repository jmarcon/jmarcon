+++
Author = "Juliano Marcon"
categories = ["Software", "Node", "Cassandra"]
comment = true
date = "2016-03-21T17:19:15-03:00"
draft = false
lastMod = "2016-03-21T15:42:00-03:00"
postImage = "cassandra.png"
tags = ["Node", "Cassandra", "NoSQL"]
title = "Node e Cassandra - Parte 2 : O mínimo do cassandra"
highlight = true

+++
Este é o segundo de três posts sobre como criar uma API utilizando o
[NodeJS](https://nodejs.org) e o [Apache Cassandra](https://cassandra.apache.org).

Não vou discutir qual é o banco mais indicado para seu projeto, deixo aqui alguns
benchmarks encontrados na internet para que você possa tomar a decisão.
<!--more-->

* [Planet Cassandra](http://www.planetcassandra.org/nosql-performance-benchmarks/)
* [MongoDB](https://www.mongodb.com/blog/post/high-performance-benchmarking-mongodb-and-nosql-systems)
* [JaxEnter](https://jaxenter.com/evaluating-nosql-performance-which-database-is-right-for-your-data-107481.html)

Neste momento, vamos preparar nossa base para receber os dados de nossa API. Para
nosso exemplo apenas armazenaremos dados simples de email e senha. Apenas focado
em uma autenticação simples.

Com o Docker do Cassandra rodando como descrito no
[artigo anterior]({{< ref "post/20160320-node-e-cassandra-parte1-ambiente.md" >}}), vamos agora nos conectar
na base de dados.

Se você criou as pastas como indicado, vamos iniciar o prompt do cassandra em uma
maquina docker temporária, execute o comando abaixo:

~~~bash
docker run -it --link cassandranode_cassandra_1:cassandra --rm cassandra sh -c 'exec cqlsh "$CASSANDRA_PORT_9042_TCP_ADDR"'
~~~

O termo  **cassandranode_cassandra_1** encontrado no comando acima se refere
ao nome do Docker que esta rodando o cassandra no Kitematic.

Desta forma, deve ver o prompt do cassandra rodando no terminal:

~~~bash
cqlsh>
~~~

A primeira coisa que faremos é criar o Keyspace. O Keyspace do cassandra é como
se fosse o Schema do banco de dados. É nesse espaço que criaremos nossa tabela
depois.

Vamos criar o Keyspace:

~~~bash
cqlsh> CREATE KEYSPACE demo
   ... WITH REPLICATION = {
   ... 'class' : 'SimpleStrategy',
   ... 'replication_factor' : 1
   ... };
~~~

Os parâmetros passados para replicação não serão tratados aqui.

Verifique se o Keyspace foi criado:

~~~bash
cqlsh> DESC KEYSPACES;

demo   system_schema   system_auth   ...
~~~

Defina o Keyspace que vamos trabalhar agora.

~~~bash
cqlsh> USE demo;
~~~

E crie nossa tabela

~~~bash
cqlsh:demo> CREATE TABLE users (
        ... email text,
        ... password text,
        ... PRIMARY KEY (email)
        ... );
~~~

Criamos nossa tabela, para ver que tudo esta no banco execute o comando:

~~~bash
cqlsh:demo> DESC SCHEMA;
~~~

Desta forma deixamos nosso banco pronto para nosso exemplo de API em NodeJS
que será finalizado no próximo artigo.
