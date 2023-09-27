import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: 'lastname',
  },
  location: {
    type: String,
    default: 'My city',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

UserSchema.methods.toJSON = function () {
  let obj = this.toObject(); // transform user to object
  delete obj.password;
  return obj;
};

export default mongoose.model('User', UserSchema);
