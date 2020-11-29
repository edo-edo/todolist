const bcrypt = require('bcryptjs');

const User = require('../user.modal');

const password = 'passwrod';
const correctComparePassword = 'passwrod';
const incorrectComparePassword = 'NoNo';
const salt = 'salt';
const hash = 'hash';

describe('User modal testing', () => {
  test('test modal create _id ', () => {
    const user = new User();

    expect(user.toObject()).toHaveProperty('_id');
  });

  test('test modal password hashing ', () => {
    const user = new User({
      password
    });

    const nextMock = jest.fn();

    bcrypt.genSalt = jest.fn((size, callback) => callback(null, salt));
    bcrypt.hashSync = jest.fn().mockReturnValue(hash);

    user.preSave(nextMock);

    expect(user.password).toBe(hash);
  });
  test('test password compare', () => {
    const user = new User({
      password
    });

    const passwordMock = jest.fn();

    bcrypt.compare = jest.fn((newPass, oldPass, Callback) => Callback(null, newPass === oldPass));

    user.isValidPassword(correctComparePassword, passwordMock);
    user.isValidPassword(incorrectComparePassword, passwordMock);

    expect(passwordMock.mock.calls[0][1]).toBe(true);
    expect(passwordMock.mock.calls[1][1]).toBe(false);
  });

  test('test compare password error', () => {
    const user = new User({
      password
    });

    const passwordMock = jest.fn();

    bcrypt.compare = jest.fn((newPassword, oldPassword, callback) => callback(new Error()));

    user.isValidPassword(correctComparePassword, passwordMock);

    expect(passwordMock.mock.calls.length).toBe(1);
    expect(passwordMock.mock.calls[0][0]).toBeInstanceOf(Error);
  });
});
