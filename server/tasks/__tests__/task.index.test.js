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

  describe('test  tasks Api ', () => {
    test('get tasks successfully testing ', async () => {
      Task.find = await jest.fn().mockReturnValue([]);

      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', process.env.TEST_TOKEN);

      expect(response.statusCode).toBe(200);
    });

    test('get tasks error testing', async () => {
      Task.find = await jest.fn().mockRejectedValue(new Error());

      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', process.env.TEST_TOKEN);

      expect(response.statusCode).toBe(500);
    });

    test('returned an error (401) unauthorized ', async () => {
      Task.find = await jest.fn().mockReturnValue([]);

      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', 'tesToken');

      expect(response.statusCode).toBe(401);
    });
  });

  describe('create task Api', () => {
    test('create task successfully testing', async () => {
      taskValidation.validateAsync = jest.fn().mockReturnValue(task);

      Task.create = await jest.fn().mockReturnValue(task);

      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', process.env.TEST_TOKEN)
        .send({ task });

      expect(response.statusCode).toBe(200);
      expect(response.body.id).toEqual(task._id);
    });

    test('create task error testing', async () => {
      taskValidation.validateAsync = jest.fn().mockReturnValue(task);

      Task.create = await jest.fn().mockRejectedValue(new Error());

      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', process.env.TEST_TOKEN)
        .send({ task });

      expect(response.statusCode).toBe(500);
    });
  });

  describe('get task Api', () => {
    test('get task successfully testing', async () => {
      Task.findOne = await jest.fn().mockReturnValue(task);

      const response = await request(app)
        .get(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN);

      expect(response.statusCode).toBe(200);
      expect(response.body.task).toEqual(task);
    });

    test('get task forbiden  testing', async () => {
      Task.findOne = await jest.fn().mockReturnValue(null);

      const response = await request(app)
        .get(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN);

      expect(response.statusCode).toBe(403);
      expect(response.text).toBe('failed to get task');
    });
    test('get task error testing', async () => {
      Task.findOne = await jest.fn().mockRejectedValue(new Error());

      const response = await request(app)
        .get(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN);

      expect(response.statusCode).toBe(500);
    });
  });

  describe('update task Api', () => {
    test('update  task successfully testing', async () => {
      Task.updateOne = await jest.fn().mockReturnValue({ nModified: 1 });

      const response = await request(app)
        .put(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN)
        .send({ status: task.status });

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual('status updated');
    });

    test('update  task forbiden  testing', async () => {
      Task.updateOne = await jest.fn().mockReturnValue({ nModified: 0 });

      const response = await request(app)
        .put(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN)
        .send({ status: task.status });

      expect(response.statusCode).toBe(403);
      expect(response.text).toEqual('Failed to update status');
    });

    test('update task error testing', async () => {
      Task.updateOne = await jest.fn().mockRejectedValue(new Error());

      const response = await request(app)
        .put(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN)
        .send({ status: task.status });

      expect(response.statusCode).toBe(500);
    });
  });

  describe('remove task Api test', () => {
    test('remove  task successfully testing', async () => {
      Task.deleteOne = await jest.fn().mockReturnValue({ deletedCount: 1 });

      const response = await request(app)
        .delete(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual('task deleted');
    });

    test('remove  task forbiden testing', async () => {
      Task.deleteOne = await jest.fn().mockReturnValue({ deletedCount: 0 });

      const response = await request(app)
        .delete(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN);

      expect(response.statusCode).toBe(403);
      expect(response.text).toBe('failed to delete task');
    });

    test('remove  task error testing', async () => {
      Task.deleteOne = await jest.fn().mockRejectedValue(new Error());

      const response = await request(app)
        .delete(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN);

      expect(response.statusCode).toBe(500);
    });
  });

  afterAll(async done => {
    await mongoose.connection.close();
    done();
  });
});
