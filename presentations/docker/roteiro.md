# DevMesh

## Juliano Marcon

Sobre mim

## Docker

### Plataforma de containers de aplicação

Os containers docker encapsulam um software em um sistema de arquivos completo que contem tudo
o que é necessário para executar: codigo, runtime, ferramentas de sistemas, bibliotecas. 

Qualquer coisa que possa ser instalado em um servidor. Isso garante que o software sempre
vai ser executado da mesma forma, independente do ambiente.

### Leveza

Containers que rodam na mesma maquina compartilham o mesmo kernel de sistema operacional, 
iniciam rapidamente e utilizam menos memoria ram. Imagens sao construidas sobre um sistema
de arquivos em camadas e compartilham arquivos comuns. Fazendo o uso de disco e o download
de imagens muito mais eficiente.

### Aberto

O Docker se baseia em padroes abertos, permitindo que os containers rodem a maioria das 
distribuicoes linux.

### Seguro por padrao

Containers isolam as aplicacoes umas das outras e da infraestrutura ao mesmo tempo que 
adicionam uma camada de protecao para a aplicacao.

### Containers

Os containers incluem a aplicacao e todas as dependencias mas compartilham o mesmo nucleo
com outros containers. Rodando processos isoladamente dentro dos sistema host. 

### Acelera o desenvolvimento

Menor tempo de definicao do ambiente, criar instancias de desenvolvimento, fazendo copias de codigos de producao para rodar localmente.

### Melhora a criatividade

As capacidades de isolamento dos containers liberam os desenvolvedores de padroes. Eles podem
usar a melhor linguagem e ferramentas para suas aplicacoes sem se preocupar em causar conflitos
com outras ferramentas.

### Elimita inconsistencias

Empacotar uma aplicacao em um container com suas dependencias e configuracoes garante que a aplicacao vai funcionar como previsto em qualquer ambiente. Local, outra maquina, no ambiente de teste, em producao. Acabaram as preocupacoes sobre os processos de instalacao das mesmas configuracoes em diferentes ambientes

### Escalavel

aplicacoes docker podem ser ligadas e desligadas em segundos tornando facil escalar servicos para resolver um pico de uso e reduzir os containers quando a demanda diminui.

## Instalacao do docker

Docker é nativo do Linux mas...

Em Julho de 2016 a Docker anunciou o lancamento oficial do Docker para macOS e para Windows.

Instalando o docker!!
