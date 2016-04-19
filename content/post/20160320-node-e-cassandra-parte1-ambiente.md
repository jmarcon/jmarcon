+++
Author = "Juliano Marcon"
categories = ["Software", "Node", "Cassandra"]
comment = true
date = "2016-03-20T17:19:02-03:00"
draft = false
lastMod = "2016-03-20T15:42:00-03:00"
postImage = "docker.png"
tags = ["Node", "Cassandra", "Docker", "Infraestrutura"]
title = "Node e Cassandra - Parte 1 : Ambiente"
highlight = true
+++

Este é o primeiro de três posts sobre como criar uma API utilizando o
[NodeJS](https://nodejs.org) e o [Apache Cassandra](https://cassandra.apache.org).

Vejo uma grande parte dos textos falando sobre a dupla de NodeJS com o
[MongoDB](https://www.mongodb.org). Mas o Cassandra pode ser uma alternativa para
alguns tipos de aplicações que demandam outros níveis de acessos de escrita e
leitura.
<!--more-->

### Instalando o ambiente.

Primeiro, estou utilizando o OSX mas, provavelmente, você terá pouco trabalho
para adaptar o que vamos ter aqui para outros sistemas.

Para abstrair um pouco vamos utilizar o [Docker](http://www.docker.com) e deixar
um pouco mais automático com o recurso "docker-compose".

No OSX e no Windows, o pessoal do Docker adquiriu o
[Kitematic](https://www.kitematic.com) que após instalado vai lhe fornecer
todos os requisitos necessários para criar nosso ambiente.

#### Preparando os arquivos

Vamos começar simplesmente criando uma arvore de diretórios que vai nos apoiar
nesse projeto.

Crie a seguinte estrutura na sua maquina:

~~~javascript
[cassandra_docker]
  [cassandra]
  [node]
    [api]
~~~

#### Criando a maquina do Cassandra

Dentro da pasta do cassandra vamos criar o arquivo de nome **Dockerfile** que vai
informar ao docker como criar a maquina.

```ruby
# Partir do docker inicial do cassandra no DockerHub
FROM cassandra:latest
```

Bem simples!

#### Criando a maquina do NodeJS

Dentro da pasta node crie mais um arquivo com o node de **Dockerfile** para
configurar o docker que vai rodar o node.

~~~ruby
# Partir do docker inicial do node do DockerHub
FROM node:latest

# Criar a pasta onde a aplicação vai rodar
RUN mkdir /api

# Definir a pasta criada como a pasta de trabalho
WORKDIR /api

# Executar a instalação das dependecias
ENTRYPOINT ["/bin/bash", "start.sh"]
~~~

Os arquivos da aplicação serão criados durante o ultimo POST desta série. Mas vamos
deixar algo preparado aqui.

#### Configurando a composição

Crie na pasta raiz (cassandra_docker) um arquivo com o nome "docker-compose.yml"
que vai receber a configuração detalhada de como o dockers vão ser criados e
como eles vão se conectar.

~~~ruby
cassandra:
  build: ./cassandra
  expose:
    - "27017"
  ports:
  - "7199:7199"
  - "7000:7000"
  - "7001:7001"
  - "9160:9160"
  - "9042:9042"

nodejs:
  build: ./node
  volumes:
    - "./node/api:/api"
  expose:
    - "3000"
  ports:
    - "3000:3000"
  links:
    - "cassandra:cassandra"
~~~


### Iniciando as maquinas

Execute o comando abaixo e aguarde a maquina do cassandra subir:

~~~bash
docker-compose up -d cassandra
~~~

É possível iniciar o Kitematic e ver as maquinas criadas. Apenas a maquina do
cassandra estará rodando e estará acessível pelo endereço 192.168.99.100:27017 se
quiser utilizar uma GUI para acessar o banco.

> O IP ***192.168.99.100*** é atribuído para a maquina virtual (virtualbox) criada como
docker-machine pelo Kitematic.
