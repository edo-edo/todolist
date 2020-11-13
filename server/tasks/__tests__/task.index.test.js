const request = require('supertest');

const app = require('../../server');
const Task = require('../task.modal');

jest.mock('../../auth/auth.controller', () => ({
  ...(jest.requireActual('../../auth/auth.controller')),
  authMiddware: (req, res, next) => {
    req.user = {
      _id: 1,
      name: 'name',
      email: 'test@gmail.com'
    };

    next();
  }
}));
const task = {
  _id: 1,
  title: 'testtitle',
  body: 'get test body',
  status: true
};

describe('test  tasks', () => {
  test('test get tasks', async () => {
    Task.find = jest.fn().mockReturnValue([]);
    const response = await request(app).get('/api/tasks');

    expect(response.statusCode).toBe(200);
  });
});
