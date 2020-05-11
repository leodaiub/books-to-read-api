"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Book = use("App/Models/Book");
const Cloudinary = use("App/Services/Cloudinary");

/**
 * Resourceful controller for interacting with books
 */
class BookController {
  /**
   * Show a list of all books.
   * GET books
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const books = Book.query().with(["category"]).fetch();
    return books;
  }

  /**
   * Create/save a new book.
   * POST books
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    if (request.file("image")) {
      let cloudinary_response = await Cloudinary.upload(request.file("image"));

      const data = request.only([
        "title",
        "category_id",
        "user_id",
        "synopsis",
      ]);

      const book = Book.create({ ...data, image: cloudinary_response.url });
      return book;
    }
    return response.json({ status: false, data: "Please upload an Image." });
  }
  /**
   * Display a single book.
   * GET books/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const book = await Book.find(params.id);
    return book;
  }

  /**
   * Update book details.
   * PUT or PATCH books/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const book = await Book.findOrFail(params.id);
    book.merge(request.all());
    await book.save();
    return book;
  }

  /**
   * Delete a book with id.
   * DELETE books/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const book = await Book.findOrFail(params.id);
    await book.delete();
    return book;
  }
}

module.exports = BookController;
