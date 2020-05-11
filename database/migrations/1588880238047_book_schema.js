"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class BookSchema extends Schema {
  up() {
    this.createIfNotExists("books", (table) => {
      table.increments();
      table.string("title").notNullable();
      table.string("image").notNullable();
      table.string("synopsis").notNullable();
      table
        .integer("category_id")
        .unsigned()
        .references("id")
        .inTable("categories");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("books");
  }
}

module.exports = BookSchema;
