const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('userFiles', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        link: DataTypes.STRING,
        userId: DataTypes.INTEGER
    });
}