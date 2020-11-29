const User = require('../../users/user.modal');
const userValidation = require('../../users/user.validation');
const { OAuth2SignUpCallback, OAuth2LogInCallback } = require('../auth.service');

const user = {
  email: 'testemail@gmail.com',
  firstName: 'testFirstName',
  lastName: 'testLastName',
};
const accessToken = 'testaccesToken';
const refreshToken = 'testrefreshToken';

const profile = {
  provider: 'google',
  name: {
    givenName: user.firstName,
    familyName: user.lastName
  },
  emails: [{ value: user.email }]
};

describe('OAuth2 functions  unit testing', () => {
  afterEach(() => {
    jest.useFakeTimers();
  });
  describe('0Auth2 Sign Up testing', () => {
    test('OAuth2 Sign Up successfully testing', async () => {
      const doneMock = jest.fn();

      User.findOne = jest.fn().mockResolvedValue(null);
      userValidation.validate = jest.fn().mockResolvedValue({ error: null });
      User.create = jest.fn().mockResolvedValue(user);

      await OAuth2SignUpCallback(accessToken, refreshToken, profile, doneMock);

      expect(doneMock.mock.calls.length).toBe(1);
      expect(doneMock.mock.calls[0][0]).toBe(null);
      expect(doneMock.mock.calls[0][1]).toBe(user);
    });

    test('OAuth2 Sign Up valid data testing', async () => {
      const details = [{ message: '"lastName" length must be at least 5 characters long' }];

      const doneMock = jest.fn();
      userValidation.validate = jest.fn().mockResolvedValue({ error: { details } });

      await OAuth2SignUpCallback(accessToken, refreshToken, {
        provider: profile.provider,
        emails: profile.emails,
        name: {
          givenName: user.firstName,
          familyName: 'test'
        }
      }, doneMock);

      expect(doneMock.mock.calls.length).toBe(1);
      expect(doneMock.mock.calls[0][0]).toBe(null);
      expect(doneMock.mock.calls[0][1]).toBe(false);
      expect(doneMock.mock.calls[0][2].message).toBe('"lastName" length must be at least 5 characters long');
    });

    test('OAuth2 Sign Up user already exists  testing', async () => {
      const doneMock = jest.fn();

      User.findOne = jest.fn().mockResolvedValue(user);
      userValidation.validate = jest.fn().mockResolvedValue({ error: null });

      await OAuth2SignUpCallback(accessToken, refreshToken, profile, doneMock);

      expect(doneMock.mock.calls.length).toBe(1);
      expect(doneMock.mock.calls[0][0]).toBe(null);
      expect(doneMock.mock.calls[0][1]).toBe(false);
      expect(doneMock.mock.calls[0][2].message).toBe(`${user.email} already exists`);
    });

    test('OAuth2 Sign Up return error  testing', async () => {
      const doneMock = jest.fn();

      User.findOne = jest.fn().mockRejectedValue(new Error());
      userValidation.validate = jest.fn().mockResolvedValue({ error: null });

      await OAuth2SignUpCallback(accessToken, refreshToken, profile, doneMock);

      expect(doneMock.mock.calls.length).toBe(1);
      expect(doneMock.mock.calls[0][1].message).toBe('something went wrong');
    });
  });

  describe('OAuth2 Log In testing', () => {
    test('OAuth2 Log In successfully testing', async () => {
      const doneMock = jest.fn();

      User.findOne = jest.fn().mockResolvedValue(user);

      await OAuth2LogInCallback(accessToken, refreshToken, profile, doneMock);

      expect(doneMock.mock.calls.length).toBe(1);
      expect(doneMock.mock.calls[0][0]).toBe(null);
      expect(doneMock.mock.calls[0][1]).toBe(user);
    });

    test('OAuth2 Log In user not found', async () => {
      const doneMock = jest.fn();

      User.findOne = jest.fn().mockResolvedValue(null);

      await OAuth2LogInCallback(accessToken, refreshToken, profile, doneMock);

      expect(doneMock.mock.calls.length).toBe(1);
      expect(doneMock.mock.calls[0][0]).toBe(null);
      expect(doneMock.mock.calls[0][1]).toBe(false);
      expect(doneMock.mock.calls[0][2].message).toBe('User not found');
    });

    test('OAuth2 Log In return error  testing', async () => {
      const doneMock = jest.fn();

      User.findOne = jest.fn().mockRejectedValue(new Error());

      await OAuth2LogInCallback(accessToken, refreshToken, profile, doneMock);

      expect(doneMock.mock.calls.length).toBe(1);
      expect(doneMock.mock.calls[0][1].message).toBe('something went wrong');
    });
  });
});
