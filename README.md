# Md-links

## 1. Prefácio

[Markdown](https://pt.wikipedia.org/wiki/Markdown) é uma linguagem de marcação
muito popular entre os programadores. É usada em muitas plataformas que
manipulam texto (GitHub, fórum, blogs e etc) e é muito comum encontrar arquivos
com este formato em qualquer repositório (começando pelo tradicional
`README.md`).

Os arquivos `Markdown` normalmente contém _links_ que podem estar
quebrados, ou que já não são válidos, prejudicando muito o valor da
informação que está ali.

Pensando  nisso, criamos essa biblioteca, usando
[Node.js](https://nodejs.org/), que leia e analise arquivos no formato
`Markdown`, para verificar os arquivos que contenham links, checar se eles estão funcionando, além de obter outras estatisticas sobre o mesmo.


## 2. Instalação
Primeiro é preciso ter em sua máquina o Node.js (com Npm incluso).
Em seu terminal, digite o comando abaixo:

` npm install -g https://github.com/kfsardela/SAP004-md-links `

Esse comando irá instalar a biblioteca globalmente, podendo ser usada em qualquer pasta.


## 3. Execução
Para utilizar a biblioteca, após a instalação, digite o comando abaixo:

   ` md-links <pasta ou arquivo desejado>`

Se o arquivo informado for do tipo markdown, ou se a pasta informada conter algum arquivo markdown,a biblioteca irá identificar o arquivo Markdown, analisar e imprimir os links que vão sendo encontrados, junto com a rota do arquivo onde aparece e o texto encontrado dentro do link (truncado 50 caracteres), como no exemplo abaixo: 

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link de algo
./some/example.md https://outra-coisa-.net/algum-doc.html algum doc
./some/example.md http://google.com/ Google
```

Ao passar a opção `--validate`, o módulo deve fazer uma requisição HTTP para
verificar se o link funciona ou não. 

Por exemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link de algo
./some/example.md https://outra-coisa-.net/algum-doc.html fail 404 algum doc
./some/example.md http://google.com/ ok 301 Google
```

O _output_ neste caso inclui a palavra `ok` e `fail` depois da URL, assim como o status da resposta recebida à requisição HTTP feita pela URL.


Se passamos a opção `--stats` o output (saída) será um texto com estatísticas
básicas sobre os links, como o total de links do arquivo e quantos deles são únicos.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

Também podemos combinar `--stats` e `--validate` para obter junto com as estatísticas, o numero de links inválidos.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

 ## 4. Autor

 Projeto desenvolvido por [Karine Sardela](https://github.com/kfsardela), no Bootcamp da [Laboratória Brasil](https://www.laboratoria.la/br). 






