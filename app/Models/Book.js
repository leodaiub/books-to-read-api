"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Book extends Model {
  category() {
    return this.belongsTo("App/Models/Category");
  }

  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Book;
