# crawler-transparencia
Web crawler para coletar dados sobre despesa orçamentária do Portal da Transparência (http://transparencia.gov.br)

### Executando o crawler

1. Execute o comando `npm install` no terminal para instalar as dependências.
2. Altere o arquivo `config.js` para as configurações da consulta desejadas. O intervalo entre `periodoInicio` e `periodoFim` deve ser de no máximo 1 mês.
3. Execute o comando `node server` no terminal e aguarde até o crawler capturar os dados do Portal da Transparência e escrever em um arquivo JSON que será criado na pasta `files` com o seguinte nome: `{fase}-{codigoOrgao}-{codigoOS}-{periodoInicio}-{periodoFim}-{offset + 1}-{offset + numeroDePaginas}.json`

##### Exemplo de configuração de consulta

```
const config = {
    periodoInicio: '01/02/2016',    // Período Inicial
    periodoFim: '28/02/2016',       // Período Final (Limite 1 mês para o inicial)
    fase: 'LIQ',                    // EMP, LIQ e PAG
    codigoOS: '26000',              // Código Órgão Superior
    codigoOrgao: '26234',           // Código Órgão
    codigoUG: 'TOD',                // Código Unidade Gestora
    codigoED: 'TOD',                // Código Elemento Despesa
    codigoFavorecido: '',           // Código Favorecido
    numeroDePaginas: 31,            // Número de Páginas
    offset: 0,                      // Offset
}
```

##### Exemplo de saída

```
[
  {
    "url": "http:\/\/www.portaltransparencia.gov.br\/despesasdiarias\/empenho?documento=153046152252016NE800102",
    "fase": "Empenho",
    "documento": "2016NE800102",
    "tipoDocumento": "Nota de Empenho (NE)",
    "data": "2016-01-29 00:00:00.0",
    "tipo": "ESTIMATIVO",
    "especie": "Anula\u00e7\u00e3o",
    "orgaoSuperior": {
      "codigo": "26000",
      "rotulo": "MINISTERIO DA EDUCACAO"
    },
    "orgao": {
      "codigo": "26234",
      "rotulo": "UNIVERSIDADE FEDERAL DO ESPIRITO SANTO"
    },
    "unidadeGestora": {
      "codigo": "153046",
      "rotulo": "UNIVERSIDADE FEDERAL DO ESPIRITO SANTO"
    },
    "gestao": {
      "codigo": "15225",
      "rotulo": "UNIVERSIDADE FEDERAL DO ESPIRITO SANTO"
    },
    "favorecido": {
      "codigo": "04.196.645\/0001-0",
      "rotulo": "IMPRENSA NACIONAL"
    },
    "valor": "R$ 50000.0000",
    "observacao": "ANULACAO TOTAL DA NOTA DE EMPENHO 2016NE800001 PARA RETIFICACAO DO FAVORECIDO.",
    "esfera": {
      "codigo": "1",
      "rotulo": "OR\u00c7AMENTO FISCAL"
    },
    "tipoCredito": "A - INICIAL (LOA)",
    "grupoFonteRecurso": {
      "codigo": "1",
      "rotulo": " RECURSOS DO TESOURO \u2013 EXERC\u00cdCIO CORRENTE"
    },
    "fonteRecurso": {
      "codigo": "12",
      "rotulo": "RECURSOS DEST.A MANUT.E DES.DO ENSINO"
    },
    "unidadeOrcamentaria": {
      "codigo": "26234",
      "rotulo": "UNIVERSIDADE FEDERAL DO ESPIRITO SANTO"
    },
    "funcao": {
      "codigo": "12",
      "rotulo": "EDUCACAO"
    },
    "subfuncao": {
      "codigo": "364",
      "rotulo": "ENSINO SUPERIOR"
    },
    "programa": {
      "codigo": "2080",
      "rotulo": "EDUCACAO DE QUALIDADE PARA TODOS"
    },
    "acao": {
      "codigo": "20RK",
      "rotulo": "FUNCIONAMENTO DE INSTITUICOES FEDERAIS DE ENSINO SUPERIOR"
    },
    "subtitulo": {
      "codigo": "0032",
      "rotulo": "FUNCIONAMENTO DE INSTITUICOES FEDERAIS DE ENSINO SUPERIOR - NO ESTADO DO ESPIRITO SANTO"
    },
    "planoOrcamentario": {
      "codigo": "0000",
      "rotulo": "FUNCIONAMENTO DE INSTITUICOES FEDERAIS DE ENSINO SUPERIOR - DESPESAS DIVERSAS"
    },
    "classificacaoEconomica": {
      "codigo": "3",
      "rotulo": "Despesas Correntes"
    },
    "grupoDespesa": {
      "codigo": "3",
      "rotulo": "Outras Despesas Correntes"
    },
    "modalidadeAplicacao": {
      "codigo": "91",
      "rotulo": "Aplic.Direta Org. F. Entidades                                                (Gastos Diretos do Governo Federal)"
    },
    "elementoDespesa": {
      "codigo": "39",
      "rotulo": "OUTROS SERVICOS DE TERCEIROS-PESSOA JURIDICA"
    },
    "documentosRelacionados": [
      {
        "data": "2016-01-05 00:00:00.0",
        "fase": "Empenho",
        "documento": "2016NE800001",
        "caminho": "empenho?documento=153046152252016NE800001",
        "instancia": "153046152252016NE800001",
        "especie": "Original",
        "valor": "50000.0000"
      }
    ],
    "subitems": [
      {
        "codigo": "90",
        "rotulo": "SERVICOS DE PUBLICIDADE LEGAL",
        "quantidade": "12.00000",
        "valor": "50000.0000",
        "descricao": "PUBLICACAO, IMPRESSAO DE JORNAL \/ REVISTA \/ LIVRO                             000010049"
      }
    ]
  }
 ]
```
