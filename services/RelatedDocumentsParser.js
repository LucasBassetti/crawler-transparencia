class RelatedDocumentsParser {
    constructor() {

    }
    run($) {

        let relatedDocuments = [],
            relatedDocument,
            relatedDocumentFields,
            value,
            url,

            relatedDocumentsHTML = $('table').last().find('tr').not('.titulo').not('.cabecalho');

        for(let i = 0, len = relatedDocumentsHTML.length; i < len; i++) {

            relatedDocumentFields = $(relatedDocumentsHTML[i]).find('td');
            relatedDocument = {};

            if(relatedDocumentFields.length === 10) {

                for(var j = 0; j < 10; j++) {

                    value = $(relatedDocumentFields[j]).text();
                    value = JSON.stringify(value).replace(/(?:\\r\\n|\\r|\\n|\\t|")/g, '').trim();

                    if(j === 2) {
                        url = $(relatedDocumentFields[j]).find('a').attr('href');
                    }

                    switch (j) {
                        // Data
                        case 0:
                            relatedDocument.data = value;
                        break;

                        // Fase
                        case 1:
                            relatedDocument.fase = value;
                        break;

                        // Documento
                        case 2:
                            relatedDocument.documento = value;
                            if(url) {
                                relatedDocument.caminho = url;
                                relatedDocument.instancia = url.substring(url.indexOf('=') + 1, url.length);
                            }
                        break;

                        // Especie
                        case 3:
                            relatedDocument.especie = value;
                        break;

                        // Valor
                        case 9:
                            relatedDocument.valor = value;
                        break;

                        default:

                    }
                }

                relatedDocuments.push(relatedDocument);
            }
        }

        return relatedDocuments;
    }
}

module.exports = RelatedDocumentsParser;
