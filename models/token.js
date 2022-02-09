const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('tokens', {
        id: {
            type: DataTypes.TEXT,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            ref: 'users',
        },
    });
}