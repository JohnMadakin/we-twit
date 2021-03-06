import mongoose from 'mongoose';

import timeStamps from './plugins/timestamps';


const postSchema = new mongoose.Schema({
  twits: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    index: true,
  },
  attachments: String,
  replies: Array,
  meta: {
    likes: Array,
    retweets: Array,
  },
});

postSchema.plugin(timeStamps);
postSchema.index({ twits: 'text', type: -1 });
export default mongoose.model('Post', postSchema);
