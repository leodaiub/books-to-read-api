"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class BooksSchema extends Schema {
  up() {
    this.table("books", (table) => {
      table.integer("status").notNullable();
    });
  }

  down() {
    this.table("books", (table) => {
      table.dropColumn("status");
    });
  }
}

module.exports = BooksSchema;
