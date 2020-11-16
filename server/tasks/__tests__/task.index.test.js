const request = require('supertest');
const siganl = require('signale');
const mongoose = require('mongoose');

siganl.disable();

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
  jest.useFakeTimers(10000);
};

describe('task Api test', () => {
  beforeEach(() => {
    time();
  });

  describe('test  tasks', () => {
    test('test get tasks', async () => {
      Task.find = await jest.fn().mockReturnValue([]);

      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', process.env.TEST_TOKEN);

      expect(response.statusCode).toBe(200);
    });

    test('test get tasks error', async () => {
      Task.find = await jest.fn().mockRejectedValue(new Error());

      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', process.env.TEST_TOKEN);

      expect(response.statusCode).toBe(500);
    });
  });

  describe('create task api', () => {
    test('create task', async () => {
      taskValidation.validateAsync = jest.fn().mockReturnValue(task);

      Task.create = await jest.fn().mockReturnValue(task);

      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', process.env.TEST_TOKEN)
        .send({ task });

      expect(response.statusCode).toBe(200);
      expect(response.body.id).toEqual(task._id);
    });

    test('create task error', async () => {
      taskValidation.validateAsync = jest.fn().mockReturnValue(task);

      Task.create = await jest.fn().mockRejectedValue(new Error());

      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', process.env.TEST_TOKEN)
        .send({ task });

      expect(response.statusCode).toBe(500);
    });
  });

  describe('get task api', () => {
    test('get task successfully test', async () => {
      Task.findOne = await jest.fn().mockReturnValue(task);

      const response = await request(app)
        .get(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN);

      expect(response.statusCode).toBe(200);
      expect(response.body.task).toEqual(task);
    });

    test('get task forbiden  error test', async () => {
      Task.findOne = await jest.fn().mockReturnValue(null);

      const response = await request(app)
        .get(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN);

      expect(response.statusCode).toBe(403);
      expect(response.text).toBe('failed to get task');
    });
    test('get  task error test', async () => {
      Task.findOne = await jest.fn().mockRejectedValue(new Error());

      const response = await request(app)
        .get(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN);

      expect(response.statusCode).toBe(500);
    });
  });

  describe('update task api', () => {
    test('update  task', async () => {
      Task.updateOne = await jest.fn().mockReturnValue({ nModified: 1 });

      const response = await request(app)
        .put(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN)
        .send({ status: task.status });

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual('status updated');
    });
  });

  describe('remove task api test', () => {
    test('remove  task', async () => {
      Task.deleteOne = await jest.fn().mockReturnValue({ deletedCount: 1 });

      const response = await request(app)
        .delete(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual('task deleted');
    });
  });

  afterAll(async done => {
    await mongoose.connection.close();
    done();
  });
});
