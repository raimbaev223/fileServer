const Token = require('../models/database')
const {readFileSync} = require("fs");

module.exports = (authToken) => {
    const tokens = readFileSync('data/tokens.txt', 'utf-8').split('\n')
    return tokens.find(token => token === authToken);
}
