"use strict";

/*
|--------------------------------------------------------------------------
| BookSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class BookSeeder {
  async run() {
    const category = await Factory.model("App/Models/Category").create();
    const book = await Factory.model("App/Models/Book").make();

    await category.book().save(book);
  }
}

module.exports = BookSeeder;
