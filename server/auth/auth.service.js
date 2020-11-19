const nodemailer = require('nodemailer');

const User = require('../users/user.modal');
const userValidation = require('../users/user.validation');

const OAuth2LogInCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;

    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    return done(null, user);
  } catch (err) {
    return done(err, { message: 'something went wrong' });
  }
};

const OAuth2SignUpCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    const firstName = profile.name.givenName;
    const lastName = profile.name.familyName;
    const { provider } = profile;

    const { error } = await userValidation.validate({
      firstName,
      lastName,
      email,
      provider
    });

    if (error) {
      return done(null, false, { message: error.details[0].message });
    }

    const user = await User.findOne({ email });
    if (user) {
      return done(null, false, { message: `${email} already exists` });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      provider
    });

    return done(null, newUser);
  } catch (err) {
    return done(err, { message: 'something went wrong' });
  }
};

const sendMail = async (user, token) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const info = await transporter.sendMail({
    from: process.env.EMAI,
    to: user.email,
    subject: 'reset password ✔',
    html: `<h1> Hello ${user.firstName} </h1>
    <p> If you requested to reset password please visit this link </p>
    <a href=${process.env.API_URL}/auth/reset-password?resetToken=${token}> reset password </a>`
  });

  return info;
};

module.exports = {
  sendMail,
  OAuth2SignUpCallback,
  OAuth2LogInCallback
};
