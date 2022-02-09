const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING,
        lastName: DataTypes.STRING,
    });
}