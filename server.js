const Parser = require('./services/Parser'),
      config = require('./config');

const parser = new Parser(config);

parser.start();
