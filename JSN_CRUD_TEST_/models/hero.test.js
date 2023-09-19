const Heroes = require('./heroes');
const mongoose = require('mongoose');

describe('Heroes Model', () => {
  beforeAll(async () => {
    // Підключення до бази даних перед тестами
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Відключення від бази даних після тестів
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Очищення колекції heroes перед кожним тестом
    await Heroes.deleteMany({});
  });

  test('should create a new hero', async () => {
    const newHero = {
      nickname: 'Superman',
      real_name: 'Clark Kent',
      origin_description: 'The last son of Krypton',
      superpowers: 'Flight, super strength, laser vision',
      catch_phrase: 'Up, up and away!',
    };

    const createdHero = await Heroes.create(newHero);

    expect(createdHero.nickname).toBe(newHero.nickname);
    expect(createdHero.real_name).toBe(newHero.real_name);
    expect(createdHero.origin_description).toBe(newHero.origin_description);
    expect(createdHero.superpowers).toBe(newHero.superpowers);
    expect(createdHero.catch_phrase).toBe(newHero.catch_phrase);
    expect(createdHero.created).toBeDefined();
  });

  test('should retrieve all heroes', async () => {
    const heroes = [
      {
        nickname: 'Superman',
        real_name: 'Clark Kent',
        origin_description: 'The last son of Krypton',
        superpowers: 'Flight, super strength, laser vision',
        catch_phrase: 'Up, up and away!',
      },
      {
        nickname: 'Batman',
        real_name: 'Bruce Wayne',
        origin_description: 'The Dark Knight of Gotham City',
        superpowers: 'Intelligence, martial arts, gadgets',
        catch_phrase: 'I\'m Batman',
      },
    ];

    await Heroes.insertMany(heroes);

    const retrievedHeroes = await Heroes.find();

    expect(retrievedHeroes).toHaveLength(2);
    expect(retrievedHeroes[0].nickname).toBe(heroes[0].nickname);
    expect(retrievedHeroes[1].nickname).toBe(heroes[1].nickname);
  });

  test('should delete a hero', async () => {
    const heroToDelete = await Heroes.create({
      nickname: 'Superman',
      real_name: 'Clark Kent',
      origin_description: 'The last son of Krypton',
      superpowers: 'Flight, super strength, laser vision',
      catch_phrase: 'Up, up and away!',
    });

    await Heroes.findByIdAndRemove(heroToDelete._id);

    const deletedHero = await Heroes.findById(heroToDelete._id);

    expect(deletedHero).toBeNull();
  });
});
