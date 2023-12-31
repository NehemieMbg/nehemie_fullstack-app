import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import { hashPassword, comparePasswords } from '../utils/passwordUtils.js';
import { createJWT } from '../utils/tokenUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';

export const register = async (req, res) => {
  // Set the role to admin for the first account registered
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);

  // Connect the user automatically after registration
  const token = createJWT({ userId: user._id, role: user.role });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true, // To disable access to the cookie via client-side JS
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production', // To use https on production
  });
  res
    .status(StatusCodes.CREATED)
    .json({ message: 'User created. User is logged in' });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const isValidUser =
    user && (await comparePasswords(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError('Invalid credentials');

  const token = createJWT({ userId: user._id, role: user.role });
  const oneDay = 5000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true, // To disable access to the cookie via client-side JS
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production', // To use https on production
  });
  res.status(StatusCodes.OK).json({ msg: 'User logged in' });
};

export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    // logout is the string which will replace the token
    httpOnly: true,
    expires: new Date(Date.now() - 10000), // Expires immediately to logout the user
    secure: process.env.NODE_ENV === 'production', // To use https on production
  });
  res.status(StatusCodes.OK).json({ message: 'User logged out' });
};

// export const logout = (req, res) => {
//   res.clearCookie('token');
//   res.status(StatusCodes.OK).json({ msg: 'User logged in' });
// };
