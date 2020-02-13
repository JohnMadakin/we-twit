import mongoose from 'mongoose';
import validator from 'validator';

import timeStamps from './plugins/timestamps';
import profileChildSchema from './profile';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => validator.isEmail(value),
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  name: String,
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  suspended: {
    type: Boolean,
    default: false,
  },
  profile: profileChildSchema,
  followers: Array,
  following: Array,

});

userSchema.plugin(timeStamps);

export default mongoose.model('User', userSchema);
