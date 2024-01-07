const request = require('supertest');
const knex = require('knex')(require('../server/knexfile.js'));
const app = require('../server/index.js'); 

describe('Users API', () => {

  describe('GET /users', () => {
    it('should get all users', async () => {
      const response = await request(app).get('/users');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /users/:id', () => {
    it('should get a user by ID', async () => {
      const existingUser = await knex('users').first();
      const response = await request(app).get(`/users/${existingUser.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.id).toBe(existingUser.id);
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const newUser = { username: 'testuser', password: 'testpassword' };
      const response = await request(app).post('/users').send(newUser);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.username).toBe(newUser.username);
    });
  });

  describe('POST /users/login', () => {
    it('should log in a user with valid credentials', async () => {
      const existingUser = await knex('users').first();
      const credentials = { username: existingUser.username, password: 'testpassword' };
      const response = await request(app).post('/users/login').send(credentials);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.username).toBe(credentials.username);
    });

    it('should return 401 for invalid username', async () => {
      const credentials = { username: 'nonexistentuser', password: 'testpassword' };
      const response = await request(app).post('/users/login').send(credentials);
      expect(response.status).toBe(401);
    });

    it('should return 401 for invalid password', async () => {
      const existingUser = await knex('users').first();
      const credentials = { username: existingUser.username, password: 'wrongpassword' };
      const response = await request(app).post('/users/login').send(credentials);
      expect(response.status).toBe(401);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user by ID', async () => {
      const existingUser = await knex('users').first();
      const response = await request(app).delete(`/users/${existingUser.id}`);
      expect(response.status).toBe(204);

      const userAfterDeletion = await knex('users').where({ id: existingUser.id }).first();
      expect(userAfterDeletion).toBeUndefined();
    });
  });
  
});
