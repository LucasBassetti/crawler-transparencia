class SubitemParser {
    constructor() {

    }
    run($, relatedDocuments) {

        let subitems = [],
            subitem,
            subitemFields,
            cabecalho,
            value,
            subitemsCabecalhoFields,

            subitemsHTML = $('.subtabela').find('tr').not('.cabecalho'),
            subitemsCabecalho = $('.subtabela').find('tr.cabecalho');

        // subitems
        for(let i = 0, len = subitemsHTML.length; i < len; i++) {

            subitemsCabecalhoFields = $(subitemsCabecalho).find('th');
            subitemFields = $(subitemsHTML[i]).find('td');
            subitem = {};

            for(let j = 0; j < subitemsCabecalhoFields.length; j++) {

                cabecalho = $(subitemsCabecalhoFields[j]).text();
                value = $(subitemFields[j]).text();
                value = JSON.stringify(value).replace(/(?:\\r\\n|\\r|\\n|\\t|")/g, '').trim();

                if(cabecalho.indexOf('Subitem da Despesa') >= 0) {
                    subitem.codigo = value.substring(0, value.indexOf(' '));
                    subitem.rotulo = value.substring(value.indexOf('-') + 2, value.length);
                }
                else if(cabecalho.indexOf('Quantidade') >= 0) {
                    subitem.quantidade = value;
                }
                else if(cabecalho.indexOf('Valor Unitário') >= 0) {
                    subitem.valorUnitario = value;
                }
                else if(cabecalho.indexOf('Valor Total') >= 0) {
                    subitem.valorTotal = value;
                }
                else if(cabecalho.indexOf('Descrição') >= 0) {
                    subitem.descricao = value;
                }
                else if(cabecalho.indexOf('Empenho') >= 0) {
                    subitem.documento = value;

                    for(var k = 0, klen = relatedDocuments.length; k < klen; k++) {
                        if(value === relatedDocuments[k].documento) {
                            subitem.instancia = relatedDocuments[k].instancia;
                        }
                    }
                }
                else if(cabecalho.indexOf('Valor') >= 0 && cabecalho.indexOf('Valor Total') < 0 && cabecalho.indexOf('Valor Unitário') < 0) {
                    subitem.valor = value;
                }
            }

            if(!subitem.documento){
                subitems.push(subitem);
            }
            else if(subitem.documento.indexOf('Não há detalhamento para este documento.') < 0) {
                subitems.push(subitem);
            }

        }

        return subitems;
    }
}

module.exports = SubitemParser;
