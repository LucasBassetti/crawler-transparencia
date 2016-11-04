const request = require("request"),
      cheerio = require('cheerio'),
      RelatedDocumentsParser = require('./RelatedDocumentsParser'),
      SubitemParser = require('./SubitemParser');

class DocumentParser {

    constructor() {
        this.relatedDocumentsParser = new RelatedDocumentsParser();
        this.subitemParser = new SubitemParser();
    }

    run(htmlString, documentURL, callback) {

        var $ = cheerio.load(htmlString),

            result = {},
            label,
            value,
            url,

            fields = $('.rotulo');

        result.url = documentURL;

        for(let i = 0, len = fields.length; i < len; i++) {

            label = $(fields[i]).text().replace(':', '').trim();
            value = $(fields[i]).next().text();
            value = JSON.stringify(value).replace(/(?:\\r\\n|\\r|\\n|\\t|")/g, '').trim();

            switch (label) {
                case 'Fase':
                    result.fase = value;
                break;

                case 'Documento':
                    result.documento = value;
                break;

                case 'Tipo de Documento':
                    result.tipoDocumento = value;
                break;

                case 'Data':
                    result.data = value;
                break;

                case 'Tipo de Empenho':
                    result.tipo = value;
                break;

                case 'Espécie de Empenho':
                    result.especie = value;
                break;

                case 'Órgão Superior':
                    result.orgaoSuperior = {
                        codigo: value.substring(0, 5),
                        rotulo: value.substring(8, value.length)
                    }
                break;

                case 'Órgão / Entidade Vinculada':
                    result.orgao = {
                        codigo: value.substring(0, 5),
                        rotulo: value.substring(8, value.length)
                    }
                break;

                case 'Unidade Gestora Emitente':
                    result.unidadeGestora = {
                        codigo: value.substring(0, 6),
                        rotulo: value.substring(9, value.length)
                    }

                case 'Gestão':
                    result.gestao = {
                        codigo: value.substring(0, 5),
                        rotulo: value.substring(8, value.length)
                    }
                break;

                case 'Favorecido':
                    result.favorecido = {
                        codigo: value.substring(0, value.indexOf(' ') - 1),
                        rotulo: value.substring(value.indexOf(' - ') + 3, value.length)
                    }
                break;

                case 'Valor':
                    result.valor = value;
                break;

                case 'Observação do Documento':
                    result.observacao = value;
                break;

                case 'Esfera':
                    result.esfera = {
                        codigo: value.substring(0, 1),
                        rotulo: value.substring(4, value.length)
                    };
                break;

                case 'Tipo de Crédito':
                    result.tipoCredito = value;
                break;

                case 'Grupo da Fonte de Recursos':
                    result.grupoFonteRecurso = {
                        codigo: value.substring(0, 1),
                        rotulo: value.substring(4, value.length)
                    };
                break;

                case 'Fonte de Recursos':
                    result.fonteRecurso = {
                        codigo: value.substring(0, 2),
                        rotulo: value.substring(5, value.length)
                    };
                break;

                case 'Unidade Orçamentária':
                    result.unidadeOrcamentaria = {
                        codigo: value.substring(0, 5),
                        rotulo: value.substring(8, value.length)
                    };
                break;

                case 'Função':
                    result.funcao = {
                        codigo: value.substring(0, 2),
                        rotulo: value.substring(5, value.length)
                    };
                break;

                case 'Subfunção':
                    result.subfuncao = {
                        codigo: value.substring(0, 3),
                        rotulo: value.substring(6, value.length)
                    };
                break;

                case 'Programa':
                    result.programa = {
                        codigo: value.substring(0, 4),
                        rotulo: value.substring(7, value.length)
                    };
                break;

                case 'Ação':
                    result.acao = {
                        codigo: value.substring(0, 4),
                        rotulo: value.substring(7, value.length)
                    };
                break;

                case 'Subtítulo (localizador)':
                    result.subtitulo = {
                        codigo: value.substring(0, 4),
                        rotulo: value.substring(7, value.length)
                    };
                break;

                case 'Plano Orçamentário - PO':
                    result.planoOrcamentario = {
                        codigo: value.substring(0, 4),
                        rotulo: value.substring(7, value.length)
                    };
                break;

                case 'Categoria de Despesa':
                    result.classificacaoEconomica = {
                        codigo: value.substring(0, 1),
                        rotulo: value.substring(4, value.length)
                    };
                break;

                case 'Grupo de Despesa':
                    result.grupoDespesa = {
                        codigo: value.substring(0, 1),
                        rotulo: value.substring(4, value.length)
                    };
                break;

                case 'Modalidade de Aplicação':
                    result.modalidadeAplicacao = {
                        codigo: value.substring(0, 2),
                        rotulo: value.substring(5, value.length)
                    };
                break;

                case 'Elemento de Despesa':
                    result.elementoDespesa = {
                        codigo: value.substring(0, 2),
                        rotulo: value.substring(5, value.length),
                    };
                break;

                case 'Processo N':
                    result.processo = value;
                break;

                default:
            }
        }

        result.documentosRelacionados = this.relatedDocumentsParser.run($);
        result.subitems = this.subitemParser.run($, result.documentosRelacionados);

        callback(result);

    }
}

module.exports = DocumentParser;
