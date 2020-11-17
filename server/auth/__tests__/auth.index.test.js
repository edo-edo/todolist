const request = require('supertest');
const siganl = require('signale');
const jwt = require('jsonwebtoken');

siganl.disable();

const app = require('../../app');
const User = require('../../users/user.modal');
const userValidation = require('../../users/user.validation');

const user = {
  email: 'testemail@gmail.com',
  password: 'password',
  firstName: 'testFistname',
  lastName: 'testLastName',
};

describe('auth Api testing', () => {
  afterEach(() => {
    jest.useFakeTimers();
  });

  jwt.sign = jest.fn().mockReturnValue('token');
  User.prototype.save = jest.fn().mockReturnValue(user);
  User.findOne = jest.fn().mockReturnValue(null);
  userValidation.validate = jest.fn().mockReturnValue({ error: null });

  describe('Sign up  Api testing', () => {
    test('sign up user successfully testing', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .set('Authorization', 'application/json')
        .send({ ...user });

      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBe('Bearer token');
    });

    test('sign up user already exist testing', async () => {
      User.findOne = jest.fn().mockReturnValue(user);

      const response = await request(app)
        .post('/api/auth/signup')
        .set('Authorization', 'application/json')
        .send({ ...user });

      expect(response.statusCode).toBe(400);
      expect(response.text).toBe(`${user.email} already exists`);
    });

    test('sign up field required testing', async () => {
      const { email, password } = user;
      const details = [{ message: '"firstName" is required' }];

      userValidation.validate = jest.fn().mockReturnValue({ error: { details } });

      const response = await request(app)
        .post('/api/auth/signup')
        .set('Authorization', 'application/json')
        .send({ email, password });

      expect(response.statusCode).toBe(400);
      expect(response.text).toBe('"firstName" is required');
    });

    test('sign up Internal error testing', async () => {
      userValidation.validate = jest.fn().mockReturnValue({ error: null });
      User.findOne = jest.fn().mockRejectedValue(new Error());

      const response = await request(app)
        .post('/api/auth/signup')
        .set('Authorization', 'application/json')
        .send({ ...user });
      expect(response.statusCode).toBe(400);
      expect(response.text).toBe('Something went wrong');
    });
  });
});
