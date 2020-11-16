const request = require('supertest');

const app = require('../../server');
const Task = require('../task.modal');
const taskValidation = require('../task.validation');

const task = {
  _id: 1,
  title: 'testtitle',
  body: 'get test body',
  status: true
};

const time = () => {
  jest.useFakeTimers();
};

describe('test  tasks', () => {
  test('test get tasks', async () => {
    Task.find = jest.fn().mockReturnValue([]);
    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', process.env.TEST_TOKEN);

    time();
    expect(response.statusCode).toBe(200);
  });

  test('create task', async () => {
    taskValidation.validateAsync = jest.fn().mockReturnValue(task);

    Task.create = jest.fn().mockReturnValue(task);

    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', process.env.TEST_TOKEN)
      .send({ task });
    time();

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toEqual(task._id);
  });

  test('get one task', async () => {
    Task.findOne = jest.fn().mockReturnValue(task);

    const response = await request(app)
      .get(`/api/tasks/${task._id}`)
      .set('Authorization', process.env.TEST_TOKEN);

    expect(response.statusCode).toBe(200);
    expect(response.body.task).toEqual(task);
  });
});
