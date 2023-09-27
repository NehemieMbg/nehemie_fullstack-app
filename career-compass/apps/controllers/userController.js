import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments(); // returns the number of jobs created

  res.status(StatusCodes.OK).json({
    status: 'success',
    data: {
      users,
      jobs,
    },
  });
};

export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password; // deleting password, in case that the user passed it
  console.log(obj);
  await User.findByIdAndUpdate(req.user.userId, obj);
  res.status(StatusCodes.OK).json({ message: 'Update user' });
};
