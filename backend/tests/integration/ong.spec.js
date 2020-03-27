const request = require ('supertest');
const app = require ('../../src/app');
const connection = require ('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  }); 

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "ONG 1",
        email: "condasdasdasdtato@apad.com.br",
        whatsapp: "11124578965",
        city: "Ribeirão Preto",
        uf: "DF"
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});