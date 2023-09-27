import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
import { NotFountError } from '../errors/customErrors.js';

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find();
  res
    .status(StatusCodes.OK)
    .json({ status: 'success', result: jobs.length, data: jobs });
};

export const createJob = async (req, res) => {
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ message: 'success', data: job }); // sending back the newly created job
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  if (!job) throw new NotFountError(`No job with the id: ${id}`);
  res.status(StatusCodes.OK).json({ status: 'success', data: job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true }); // new: true => return the updated job

  if (!updatedJob) throw new NotFountError(`No job with the id: ${id}`);

  res
    .status(StatusCodes.OK)
    .json({ status: 'Job has been updated', data: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);

  if (!removedJob) throw new NotFountError(`No job with the id: ${id}`);
  res.status(StatusCodes.OK).json({ status: 'Job deleted', job: removedJob });
};
