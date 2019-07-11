---
date : 2016-04-16T15:42:00-03:00
lastMod : 2016-04-16T15:42:00-03:00
title : É tudo JavaScript
tags:
  - "Cliente"
  - "Gestão"
categories:
  - "Software"
  - "Agilidade"
comment : true
Author : Juliano Marcon
layout: post
img : posts/meanjs.png
image : posts/meanjs.png
---
Vejo que atualmente muito se fala sobre MEAN Stack. Em resumo é uma pilha de tecnologias para desenvolvimento web baseada em JavaScript. Não pretendo discutir se a linguagem é a melhor. Vou apresentar as vantagens e desvantagens de basear todo o ambiente em uma única linguagem.
<!--more-->

Se seu foco é aprender sobre o MEAN, pode encontrar informações agrupadas em
[MEAN.IO](http://www.mean.io) ou em [MEAN.JS](https://www.meanjs.org). Mas sugiro
que foque primeiro nas tecnologias em separado:

* [**M**ongo](https://www.mongodb.org)
* [**E**xpress](http://www.expressjs.com)
* [**A**ngular](https://www.angularjs.org)
* [**N**ode](https://www.nodejs.org)

Se sua situação atual está um passo antes, ou seja, decidindo SE vai utilizar
esse conjunto de recursos vou levantar alguns pontos que podem ser de seu interesse
para apoiar sua escolha.

### Vantagens

#### A linguagem é sempre a mesma

Ter um ambiente onde todos os sistemas falam a mesma língua ajuda as pessoas
a conseguirem discutir livremente sobre o que pode estar ocorrendo ou como criar um programa da melhor forma possível.

A análise da qualidade do código pode ser simplificada, programadores podem fazer
o **code review** de outros mais facilmente. Dessa forma, mais e mais pessoas terão a capacidade de avaliar se o que está sendo produzido é feito da melhor forma.

#### Curva de aprendizagem

A curva de aprendizagem entre os sistemas e tecnologias envolvidos é reduzida e as pessoas podem
evoluir mais rapidamente no conhecimento do código gerado e aumentar a produtividade.

A comunidade pode apoiar facilmente os novos profissionais e uma maior quantidade
de cursos e treinamentos estarão disponíveis para apoiar a evolução de um time em
formação.

#### A linguagem é bem difundida

Se existe tecnologia em diversos meios com a mesma linguagem, é bem provável que
exista um maior numero de pessoas que a conheçam bem. Isso é um aliado forte no
momento de montar um time de desenvolvedores.

Contratar novos profissionais, quando o produto evoluir e crescer, pode ser um
desafio. Saber que a tecnologia é amplamente conhecida facilita para as equipes
de recrutamento captar pessoas para o time em crescimento.

#### Existe muita coisa pronta

Com a mesma linguagem, a quantidade de módulos e códigos prontos disponíveis nos
repositórios na internet aumenta significativamente a cada dia. Isso pode significar
um aumento de produtividade para iniciar seu projeto e mais velocidade nas entregas.

O uso de repositórios como o [NPM](https://www.npmjs.com) torna simples utilizar novos
módulos nas aplicações.

<div class="row">
  <div class="col-xs-2"></div>
  <div class="col-xs-8 text-center">
    <img src="/assets/img/posts/js_back_front_joke.jpg" alt="Tudo javascript"
    class="img-responsive"
    style="width:100%; max-width:400px">
  </div>
  <div class="col-xs-2"></div>
</div>


### Desvantagens

#### A linguagem é sempre a mesma

Você deve estar se perguntando: "Mas isso não é uma vantagem?". Nesse caso, existem dois
lados da moeda. A falsa visão de que, por ser a mesma linguagem, a tecnologia é a mesma
pode causar um risco aos projetos.

Afinal, um programador de aplicação "front-end" tem um foco de pensamento e raciocínio
diferente do programador de "back-end" que tem um foco diferente de como armazenar
informações e deveria ter apoio de conhecedores do banco de dados escolhido.

#### A linguagem é bem difundida e existe muita coisa pronta

Agrupei essas duas vantagens para apresentar o risco que ambas podem gerar em um
projeto novo.

A facilidade de encontrar conhecimento e módulos prontos gera o risco de contratar
pessoas que apenas sabem utilizar os recursos prontos e não tem conhecimento para
desenvolver a solução da melhor forma.

Alguns profissionais criam aplicações "do zero", sem que eles escrevam realmente
uma linha de código voltada para o produto, possuem mais de 3500 arquivos.

Ao invés de discorrer sobre o tema de forma aprofundada (pois sei que esse assunto
é polêmico), segue duas referências interessantes para estudo que podem exemplificar
bem como isso pode estar afetando a comunidade.

* [NPM : Have we forgotten how to program?](http://www.haneycodes.net/npm-left-pad-have-we-forgotten-how-to-program/)
* [Why Code in Node.js often gets Rejected by SoundCloud](https://youtu.be/kA4-b7hvWhg)

#### Dependência

A escolha de uma pilha baseada na mesma linguagem normalmente inclui a utilização
de frameworks. Isso é natural, o MEAN é um caso desses, pois utiliza o Express.

Os envolvidos no desenvolvimento do projeto acabam por ficar dependentes do uso
de determinados recursos e acabam restringindo o uso da tecnologia como um todo.
Muitas vezes estas restrições são agravadas quando novas versões do framework são
lançadas e a aplicação precisa de refactorings para utilizar o que é novo.

A dependência pode ficar ainda mais evidente quando um framework para de ser
desenvolvido e as aplicações continuam a ser utilizadas. Mudanças futuras terão um
débito técnico que nunca poderão pagar sem reescrever todo o código.

##### É muita coisa para um único profissional

<div class="row">
  <div class="col-xs-2"></div>
  <div class="col-xs-8 text-center">
    <img src="/assets/img/posts/MEAN-Stack-Expertise.jpg" alt="Não é pouca coisa"
    class="img-responsive"
    style="width:100%; max-width:400px">
  </div>
  <div class="col-xs-2"></div>
</div>


## Conclusão

Considerando os pontos acima, acredito que utilizar recursos como o MEAN é vantajoso
principalmente para profissionais ou empresas que pretendem provar um conceito, e que, após um resultado positivo, se preparem para mitigar os riscos e construir, não apenas
uma aplicação escalável, mas formas de mitigar os riscos gerados por essa escolha
dentro de seus ambientes.
