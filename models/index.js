var fs        = require("fs");
var path      = require("path");
var db        = {};
var mysql = require('mysql');
var Sequelize = require('sequelize');
var env = require('../config/env');

var sequelize = new Sequelize(env.db.database, env.db.user, env.db.password, {
    host: env.db.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        timestamps: false,
        dateStrings:true
    },
    logging: function (log){
      console.log(log);
    },
    dateStrings:true,
    operatorsAliases: false
    // operatorsAliases: {
    //           // $and: Sequelize.Op.and,
    //           $or: Sequelize.Op.or,
    //           // $eq: Op.eq,
    //           // $gt: Op.gt,
    //           // $lt: Op.lt,
    //           // $lte: Op.lte,
    //           // $like: Op.like
    //         }
});

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;