const Sequelize = require('sequelize');

const Op = Sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
};


var mysql = require('mysql');
var con = mysql.createConnection({
        host: "amedic-mysqldbserver.mysql.database.azure.com",
        user: "mysqldbuser@amedic-mysqldbserver",
        password: "Grupp2122",
        database: "AMEDIC_DB"
    });

const db = new Sequelize('AMEDIC_DB', 'mysqldbuser@amedic-mysqldbserver', 'Grupp2122', {
    host: "amedic-mysqldbserver.mysql.database.azure.com",
    dialect: "mysql",
    operatorsAliases,
    pool:{
        min:0,
        acquire: 30000,
        idle: 100000
    }

});


//module.exports = con;
module.exports = db;