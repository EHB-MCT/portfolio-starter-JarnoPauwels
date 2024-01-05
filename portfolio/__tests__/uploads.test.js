const request = require('supertest');
const app = require('../server/index.js'); 

describe('Uploads API', () => {

  describe('GET /uploads', () => {
    it('should get all uploads', async () => {
      const response = await request(app).get('/uploads')
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
  
  describe('POST /uploads', () => {
    it('should upload a file', async () => {
      const newUpload = { user_id: '65a68758-f179-46b9-a72c-1fddad74760f', filename: 'path/to/testfile.gltf' };
      const response = await request(app).post('/uploads').send(newUpload);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.user_id).toBe(newUpload.user_id);
      expect(response.body.filename).toBe(newUpload.filename);
    });
  });

});
