const request = require('supertest');
const siganl = require('signale');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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

const { email, password } = user;

describe('auth Api testing', () => {
  afterEach(() => {
    jest.useFakeTimers();
  });

  jwt.sign = jest.fn().mockReturnValue('test_token');
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
      expect(response.body.token).toBe('Bearer test_token');
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

  describe('Log In  Api testing', () => {
    test('Log in user successfully testing', async () => {
      const compareMock = jest.fn((pass, callback) => callback(null, true));

      User.findOne = jest.fn().mockReturnValue({ ...user, isValidPassword: compareMock });

      const response = await request(app)
        .post('/api/auth/login')
        .set('Authorization', 'application/json')
        .send({ email, password });

      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBe('Bearer test_token');
    });

    test('Incorect password testing', async () => {
      const compareMock = jest.fn((pass, callback) => callback(null, false));

      User.findOne = jest.fn().mockReturnValue({ ...user, isValidPassword: compareMock });

      const response = await request(app)
        .post('/api/auth/login')
        .set('Authorization', 'application/json')
        .send({ email, password });

      expect(response.statusCode).toBe(400);
      expect(response.text).toBe('Wrong Password');
    });

    test('User not found  testing', async () => {
      User.findOne = jest.fn().mockReturnValue(null);

      const response = await request(app)
        .post('/api/auth/login')
        .set('Authorization', 'application/json')
        .send({ email, password });

      expect(response.statusCode).toBe(400);
      expect(response.text).toBe('User not found');
    });
  });

  describe('Forgot password Api testing', () => {
    test('forgot password  successfully testing', async () => {
      User.findOne = jest.fn().mockReturnValue(user);
      nodemailer.createTransport = jest.fn().mockReturnValue({ sendMail: jest.fn() });
      User.updateOne = jest.fn().mockReturnValue({ nModified: 1 });

      const response = await request(app)
        .post('/api/auth/forgot-password')
        .set('Authorization', 'application/json')
        .send({ email });
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('send success');
    });

    test('forgot password  User not found testing', async () => {
      User.findOne = jest.fn().mockReturnValue(null);

      const response = await request(app)
        .post('/api/auth/forgot-password')
        .set('Authorization', 'application/json')
        .send({ email });

      expect(response.statusCode).toBe(400);
      expect(response.text).toBe('User not found');
    });
  });
});
