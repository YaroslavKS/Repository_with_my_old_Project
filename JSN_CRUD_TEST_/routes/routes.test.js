const request = require('supertest');
const express = require('express');

const app = express();

// Підключаємо роутер
const router = require('./routes');
app.use('/', router);

// Сам тест
describe("router", () => {
  test('should add a hero successfully', async () => {
    const response = await request(app)
      .post('/add')
      .field('nickname', 'Superman')
      .field('real_name', 'Clark Kent')
      .field('origin_description', 'The last son of Krypton')
      .field('superpowers', 'Flight, super strength, laser vision')
      .field('catch_phrase', 'Up, up and away!')
      .attach('image', 'path/to/image.jpg');

    expect(response.statusCode).toBe(302); // Перенаправлення
    expect(response.header['location']).toBe('/'); // Редірект на головну сторінку
  });

  test('should get all heroes successfully', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200); // Успішний статус код
    expect(response.text).toContain('Heroes List'); // Перевірка наявності тексту "Heroes List" у відповіді
  });

  test('should render the home page successfully', async () => {
    const response = await request(app).get('/home');
    expect(response.statusCode).toBe(200); // Успішний статус код
    expect(response.text).toContain('Home Page'); // Перевірка наявності тексту "Home Page" у відповіді
  });

  test('should render the add hero page successfully', async () => {
    const response = await request(app).get('/add');
    expect(response.statusCode).toBe(200); // Успішний статус код
    expect(response.text).toContain('Add Hero'); // Перевірка наявності тексту "Add Hero" у відповіді
  });

  test('should render the edit hero page successfully', async () => {
    const response = await request(app).get('/edit/123'); // Заміни 123 на існуючий ID героя
    expect(response.statusCode).toBe(200); // Успішний статус код
    expect(response.text).toContain('Edit Hero'); // Перевірка наявності тексту "Edit Hero" у відповіді
  });

  test('should delete a hero successfully', async () => {
    const response = await request(app).get('/delete/123'); // Заміни 123 на існуючий ID героя
    expect(response.statusCode).toBe(302); // Перенаправлення
    expect(response.header['location']).toBe('/'); // Редірект на головну сторінку
  });
});
