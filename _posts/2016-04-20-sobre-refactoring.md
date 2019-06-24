---
Author: "Juliano Marcon"
categories: ["Agilidade", "Pessoas", "Software"]
comment: true
date: "2016-04-20T17:48:35-03:00"
lastMod: "2016-04-21T15:42:00-03:00"
img: "posts/tdd.jpg"
layout: post
tags : ["Tecnologia", "Projetos", "Brasil", "Débito Técnico", "Visão Corporativa"]
title: "Sobre TDD e Refactoring"
---

A preocupação diária com a qualidade dos código construídos nas empresas que desenvolvem software, próprios ou para terceiros, estão fomentando a prática de técnicas como o TDD.

Os times tem espaço para aprender e aplicar essa técnica? Será que as empresas realmente sabem o que significa isso?

<!--more-->

### O que é TDD?

[Test Driven Development (TDD)](https://pt.wikipedia.org/wiki/Test_Driven_Development), ou em tradução livre, Desenvolvimento Orientado a Testes é uma metodologia com foco em converter as necessidades de negócios em testes computacionais para, em seguida, escrever um trecho de código que passe no teste e, finalmente, executar o Refactoring dos programas.

Busca-se um código de qualidade, funcionando e testado, através da repetição contínua do ciclo apresentado acima.

### O que é Refactoring?

É a prática de reescrever códigos sem alterar sua funcionalidade evoluindo suas características não funcionais. Executar de forma contínua pequenos procedimentos de refactoring produz uma reestruturação significativa no projeto.

![Qualidade](/assets/img/posts/qualidade.png){:style="max-width:200px; float:left; margin:10px;"}

O passo de Refactoring é o que garante a qualidade e performance do código escrito e, portanto, o procedimento mais impactado pelo triângulo da qualidade.

Durante o levantamento de projetos e seu planejamento, as principais informações que são avaliadas pelos stakeholders são os lados desse triângulo, e tentam ao máximo reduzir o custo e o tempo sempre tentando incluir o máximo de escopo.

Mesmo que a grande maioria dos gestores de projeto conheça essa tríplice, quando se trata de software, a espectativa deles é que a qualidade seja garantida pela equipe de desenvolvimento. Desta formar, a qualidade é a primeira que sofre impactos quando o cronograma precisa ser reduzido sem perder as funcionalidades pedidas pelo cliente.

Isso seria um comportamento aceitável em circunstâncias onde exista flexibilidade para rever o código posteriormente. Mas... Projetos devem ter começo e fim. A solução seria criar um novo projeto para resolver as falhas futuras, mas é difícil defender o lucro em um projeto assim. Tento apresentar uma sugestão para lidar com essa situação em [outro artigo]({{ site.baseurl }}{% post_url 2016-04-24-o-debito-tecnico-das-empresas-projetizadas %}).

Ao final, considerado entregue, um produto sai da fila de prioridades da empresa e novos projetos começam a ser estudados.

### Como manter a qualidade?

A janela da situação do projeto continuará sendo um cronograma, mas não apenas é possível apresentar as necessidades e os benefícios de investir na qualidade durante o desenvolvimento, como é simples demonstrar o valor agregado nessas ações.

##### Qualidade faz parte do escopo:

Apesar de improvável, o levantamento inicial deveria considerar os requisitos não funcionais como parte do escopo e o tempo de refactoring necessário para garantir a qualidade do código.

Esses tempo deve ser defendido no projeto como risco operacional futuro e dependências para a continuidade do negócio.

Em times ágeis, a participação de um arquiteto e o auto aprendizado do time causa um senso de responsabilidade pelo produto que força as pessoas a considerar o refactoring no momento da definição do escopo das atividades.

##### Equipes de qualidade que entendem do código:

Definir uma equipe de revisão de código constante e responsável pela arquitetura e requisitos não funcionais de cada projeto.

Essas equipes poderiam ser divididas por linha de negócios ou produto e deveriam não apenas fomentar os refactorings antes da entrega das funcionaldiades mas também acompanhar o desenvolvimento de perto.

É uma prática comum para escalar os times ágeis ter um time de arquitetura responsável por um conjunto de produtos e funcionalidades apoiando os times de desenvolvimento.

##### Definir o que testar:

Ter absolutamente tudo com testes é algo muito caro e, provavelmente, o custo envolvido supera os benefícios.

Um código 100% testado pode parecer um sonho para muitos desenvolvedores e entusiastas do TDD, mas é fato que para ter esse nível de qualidade, muito tempo e dinheiro devem ser investidos.

É preciso ponderar se os testes estão realmente agregando valor para a empresa, pois pode ocorrer que o custo de manutenção do teste supere os custos de manutenção do código.

Definir uma porcentagem de cobertura dos testes pode ajudar flexibilizar o esforço, mas isso pode impactar como as pessoas escrevem os testes e os desenvolvedores podem acabar focando em escrever os testes mais simples e deixar as rotinas mais complexas descobertas. Isso é o oposto de agregar valor.

Portanto, neste caso, o time deve ser guiado e evoluir para conseguir criar uma consciência comum sobre a relevância do teste, a visão da equipe de negócios sobre a funcionalidade e a percepção dos programas que possuem dependências de outros trechos de código e que podem ser impactados facilmente por alterações futuras.

##### Acompanhe:

Use algumas métricas para acompanhar a evolução da qualidade de seu código, como a quantidade de defeitos encontrados após a entrega, a melhora da velocidade da aplicação ou a diminuição das reclamações dos clientes.
