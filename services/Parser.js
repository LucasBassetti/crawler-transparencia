const request = require("request"),
      cheerio = require('cheerio'),
      fs = require('fs'),
      DocumentParser = require('./DocumentParser');

const URL_BASE = "http://www.portaltransparencia.gov.br/despesasdiarias/";

class Parser {

    constructor(config) {
        this.config = config;
        this.searchURL = 'resultado?consulta=avancada&periodoInicio=' + config.periodoInicio
                        + '&periodoFim=' + config.periodoFim
                        + '&fase=' + config.fase
                        + '&codigoOS=' + config.codigoOS
                        + '&codigoOrgao=' + config.codigoOrgao
                        + '&codigoUG=' + config.codigoUG
                        + '&codigoED=' + config.codigoED
                        + '&codigoFavorecido=' + config.codigoFavorecido
                        + '&pagina=';

        this.documentParser = new DocumentParser();

        this.documentsURL = [],
        this.documents = [];
    }

    start() {
        console.log('======================================================');
        console.log(' CAPTURA DE URLS INICIALIZADA');
        this._getURLs(this.config.offset + 1)
    }

    _getURLs(page) {

        let _this = this,
            lastPage = this.config.offset + this.config.numeroDePaginas,
            requestURL = URL_BASE + this.searchURL + page;

        console.log('======================================================');
        console.log(' URL: ' + requestURL);

        request(requestURL, function (error, response, body) {

            if (!error) {
                let $ = cheerio.load(body),
                    docURLs = $('table').last().find('.campo:nth-child(3)').find('a'),
                    docURL;

                for(let i = 0, len = docURLs.length; i < len; i++) {
                    docURL = $(docURLs[i]).prop('href');
                    _this.documentsURL.push(URL_BASE + docURL);
                }

                if(page === lastPage) {
                    console.log('======================================================');
                    console.log(' CAPTURA DE URLS FINALIZADA ');
                    console.log(' TOTAL DE URLS: ' + _this.documentsURL.length);
                    console.log('======================================================');
                    console.log(' PARSER INICIALIZADO ');

                    _this._runParser(_this.documentsURL);
                }
                else {
                    setTimeout(function() {
                        _this._getURLs(page + 1);
                    }, 3000);
                }
            }
        });
    }

    _runParser(documentsURL) {
        let _this = this;

        if(documentsURL.length !== 0) {

            console.log('======================================================');
            console.log(' DOCUMENTO: ' + documentsURL[0]);
            console.log(' RESTAM: ' + documentsURL.length);

            request(documentsURL[0], function (error, response, body) {
                if (!error) {
                    _this.documentParser.run(body, documentsURL[0], function(result) {
                        _this.documents.push(result);

                        setTimeout(function() {
                            documentsURL.splice(0, 1);
                            _this._runParser(documentsURL);
                        }, 3000);
                    });
                } else {
                    console.log(error);
                }
            });
        }
        else {
            console.log('======================================================');
            console.log(' PARSER FINALIZADO ');
            console.log(' TOTAL DE DOCUMENTOS: ' + this.documents.length);

            this._writeFile();
        }
    }

    _writeFile() {

        console.log('======================================================');
        console.log(' GERANDO ARQUIVO');

        const _this = this,
              dir  = "files/" + this.config.fase,
              file = dir + '/' +
                     this.config.fase + '-' +
                     this.config.codigoOrgao + '-' +
                     this.config.codigoOS + '-' +
                     this.config.periodoInicio.replace(/\//g, '') + '-' +
                     this.config.periodoFim.replace(/\//g, '') + '-' +
                     this.config.offset + '-' +
                     (this.config.offset + this.config.numeroDePaginas) + '.json';

        // create dir if not exist
        if (!fs.existsSync(dir)){
             fs.mkdirSync(dir);
        }

        fs.writeFile(file, JSON.stringify(this.documents), function (err) {
            if (err) return console.log(err);
            console.log('======================================================');
            console.log(' ARQUIVO GERADO COM SUCESSO');
            console.log(' ' + _this.documents.length + ' DOCUMENTOS FORAM INSERIDOS EM ' + file + '!');
            console.log('======================================================');
        });
    }
}

module.exports = Parser;
