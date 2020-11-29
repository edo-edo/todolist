const request = require('supertest');
const siganl = require('signale');

siganl.disable();

const app = require('../../app');
const Task = require('../task.modal');
const taskValidation = require('../task.validation');

const task = {
  _id: 1,
  title: 'testtitle',
  body: 'get test body',
  status: true
};

describe('task Api test', () => {
  afterEach(() => {
    jest.useFakeTimers();
  });

  describe('test  tasks Api ', () => {
    test('get tasks successfully testing ', async () => {
      Task.find = jest.fn().mockResolvedValue([]);

      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', process.env.TEST_TOKEN);

      expect(response.statusCode).toBe(200);
    });

    test('get tasks error testing', async () => {
      Task.find = jest.fn().mockRejectedValue(new Error());

      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', process.env.TEST_TOKEN);

      expect(response.statusCode).toBe(500);
    });
  });

  describe('create task Api', () => {
    test('create task successfully testing', async () => {
      taskValidation.validate = jest.fn().mockResolvedValue({ error: null });

      Task.create = jest.fn().mockResolvedValue(task);

      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', process.env.TEST_TOKEN)
        .send({ task });

      expect(response.statusCode).toBe(200);
      expect(response.body.id).toEqual(task._id);
    });

    test('create task error testing', async () => {
      taskValidation.validate = jest.fn().mockResolvedValue({ error: null });

      Task.create = jest.fn().mockRejectedValue(new Error());

      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', process.env.TEST_TOKEN)
        .send({ task });

      expect(response.statusCode).toBe(500);
    });

    test('create task valid error testing', async () => {
      const details = [{ message: '"title" is required' }];

      taskValidation.validate = jest.fn().mockResolvedValue({ error: { details } });

      Task.create = jest.fn().mockRejectedValue(new Error());

      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', process.env.TEST_TOKEN)
        .send({ ...task._id, ...task.body, ...task.status });

      expect(response.statusCode).toBe(400);
      expect(response.text).toBe('"title" is required');
    });
  });

  describe('get task Api', () => {
    test('get task successfully testing', async () => {
      Task.findOne = jest.fn().mockResolvedValue(task);

      const response = await request(app)
        .get(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN);

      expect(response.statusCode).toBe(200);
      expect(response.body.task).toEqual(task);
    });

    test('get task forbiden  testing', async () => {
      Task.findOne = jest.fn().mockResolvedValue(null);

      const response = await request(app)
        .get(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN);

      expect(response.statusCode).toBe(403);
      expect(response.text).toBe('failed to get task');
    });
    test('get task error testing', async () => {
      Task.findOne = jest.fn().mockRejectedValue(new Error());

      const response = await request(app)
        .get(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN);

      expect(response.statusCode).toBe(500);
    });
  });

  describe('update task Api', () => {
    test('update  task successfully testing', async () => {
      Task.updateOne = jest.fn().mockResolvedValue({ nModified: 1 });

      const response = await request(app)
        .put(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN)
        .send({ status: task.status });

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual('status updated');
    });

    test('update  task valid error testing', async () => {
      const response = await request(app)
        .put(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN)
        .send({ status: task.body });

      expect(response.statusCode).toBe(400);
      expect(response.text).toBe('"value" must be a boolean');
    });

    test('update  task forbiden  testing', async () => {
      Task.updateOne = jest.fn().mockResolvedValue({ nModified: 0 });

      const response = await request(app)
        .put(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN)
        .send({ status: task.status });

      expect(response.statusCode).toBe(403);
      expect(response.text).toEqual('Failed to update status');
    });

    test('update task error testing', async () => {
      Task.updateOne = jest.fn().mockRejectedValue(new Error());

      const response = await request(app)
        .put(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN)
        .send({ status: task.status });

      expect(response.statusCode).toBe(500);
    });
  });

  describe('remove task Api test', () => {
    test('remove  task successfully testing', async () => {
      Task.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

      const response = await request(app)
        .delete(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual('task deleted');
    });

    test('remove  task forbiden testing', async () => {
      Task.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 0 });

      const response = await request(app)
        .delete(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN);

      expect(response.statusCode).toBe(403);
      expect(response.text).toBe('failed to delete task');
    });

    test('remove  task error testing', async () => {
      Task.deleteOne = jest.fn().mockRejectedValue(new Error());

      const response = await request(app)
        .delete(`/api/tasks/${task._id}`)
        .set('Authorization', process.env.TEST_TOKEN);

      expect(response.statusCode).toBe(500);
    });
  });
});
