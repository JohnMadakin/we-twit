import mongoose from 'mongoose';
import timeStamps from './plugins/timestamps';

const profileSchema = new mongoose.Schema({
  sex: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  address: String,
  imageUrl: String,
  dateOfBirth: Date,
});

profileSchema.plugin(timeStamps);

export default profileSchema;
