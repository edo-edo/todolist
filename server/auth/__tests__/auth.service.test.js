const { oAuth2Callback } = require('../auth.service');
const User = require('../../users/user.modal');
const userValidation = require('../../users/user.validation');

const user = {
  email: 'testemail@gmail.com',
  firstName: 'testFirstName',
  lastName: 'testLastName',
};

const profile = {
  provider: 'google',
  name: {
    givenName: user.firstName,
    familyName: user.lastName
  },
  emails: [{ value: user.email }]
};

describe('OAuth2 function  unit testing', () => {
  afterEach(() => {
    jest.useFakeTimers();
  });

  test('OAuth2 sign up successfully testing', async () => {
    const doneMock = jest.fn();

    User.findOne = jest.fn().mockReturnValue(null);
    userValidation.validate = jest.fn().mockReturnValue({ error: null });
    User.create = jest.fn().mockReturnValue(user);

    await oAuth2Callback('dcdc', 'cdwce', profile, doneMock);

    expect(doneMock.mock.calls.length).toBe(1);
    expect(doneMock.mock.calls[0][0]).toBe(null);
    expect(doneMock.mock.calls[0][1]).toBe(user);
  });

  test('OAuth2 sign up valid data testing', async () => {
    const details = [{ message: '"lastName" length must be at least 5 characters long' }];

    const doneMock = jest.fn();
    userValidation.validate = jest.fn().mockReturnValue({ error: { details } });

    await oAuth2Callback('dcdc', 'cdwce', {
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

  test('OAuth2 sign up user already exists  testing', async () => {
    const doneMock = jest.fn();

    User.findOne = jest.fn().mockReturnValue(user);
    userValidation.validate = jest.fn().mockReturnValue({ error: null });

    await oAuth2Callback('dcdc', 'cdwce', profile, doneMock);

    expect(doneMock.mock.calls.length).toBe(1);
    expect(doneMock.mock.calls[0][0]).toBe(null);
    expect(doneMock.mock.calls[0][1]).toBe(false);
    expect(doneMock.mock.calls[0][2].message).toBe(`${user.email} already exists`);
  });

  test('OAuth2 sign up return error  testing', async () => {
    const doneMock = jest.fn();

    User.findOne = jest.fn().mockRejectedValue(new Error());
    userValidation.validate = jest.fn().mockReturnValue({ error: null });

    await oAuth2Callback('dcdc', 'cdwce', profile, doneMock);

    expect(doneMock.mock.calls.length).toBe(1);
    expect(doneMock.mock.calls[0][1].message).toBe('something went wrong');
  });
});
