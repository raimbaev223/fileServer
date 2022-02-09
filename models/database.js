const {Sequelize} = require('sequelize');
const UserModel = require('./user')
const TokenModel = require('./token')
const UserFileModel = require('./userFile')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/database.sqlite'
})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const User = UserModel(sequelize, Sequelize);
const UserFile = UserFileModel(sequelize, Sequelize);
const Token = TokenModel(sequelize, Sequelize);

Token.belongsTo(User);
UserFile.belongsTo(User);
User.hasMany(UserFile, { as: 'userId' });

sequelize.sync({ force: false })
    .then(() => {
        console.log(`Database & tables created!`);
    });

module.exports = {
    User,
    UserFile,
    Token,
}
