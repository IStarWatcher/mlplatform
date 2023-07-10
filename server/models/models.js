const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique:true},
    password: {type: DataTypes.STRING}
})

const Base = sequelize.define('base', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    id_base: {type: DataTypes.INTEGER, allowNull: false}
})

User.hasMany(Base)
Base.belongsTo(User)

module.exports = {
    User,
    Base
}