import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';
import cloudinary from 'cloudinary';
import * as fs from 'fs/promises';

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.find();
  const jobs = await Job.countDocuments(); // returns the number of jobs created
  const adminUsers = users.filter((user) => user.role === 'admin');

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      jobs,
      numUser: users.length,
      numAdmin: adminUsers.length,
      users,
    },
  });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password; // deleting password, in case that the user passed it

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path); // remove the file from the server
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }
  const oldUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && oldUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(oldUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ message: 'Update user' });
};
