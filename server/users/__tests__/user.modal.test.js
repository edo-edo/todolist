const bcrypt = require('bcryptjs');

const User = require('../user.modal');

describe('User modal testing', () => {
  test('test modal create _id ', () => {
    const user = new User();

    expect(user.toObject()).toHaveProperty('_id');
  });

  test('test modal password hashing ', async () => {
    const password = 'password';
    const salt = 'salt';
    const hash = 'hash';

    const user = new User();

    user.password = password;

    const nextMock = jest.fn();

    bcrypt.genSalt = jest.fn((size, callback) => callback(null, salt));
    bcrypt.hashSync = jest.fn().mockReturnValue(hash);

    user.preSave(nextMock);

    expect(user.password).toBe(hash);
  });
});
