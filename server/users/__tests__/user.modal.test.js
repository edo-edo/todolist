const bcrypt = require('bcryptjs');

const User = require('../user.modal');

const password = 'passwrod';

describe('User modal testing', () => {
  test('test modal create _id ', () => {
    const user = new User();

    expect(user.toObject()).toHaveProperty('_id');
  });

  test('test modal password hashing ', () => {
    const salt = 'salt';
    const hash = 'hash';

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
    const correctComparePassword = 'passwrod';
    const incorrectComparePassword = 'NoNo';

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
});
