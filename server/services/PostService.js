import models from '../models';

const { PostModel } = models;

export default class PostService {
  /**
   * @description create a new post
   * @param {object} userObject - {
        userId, twits, attachments,
      }
   * @return {Promise} user
   */
  static async createNewTwit(twitObject) {
    try {
      const createTwit = new PostModel(twitObject);
      return createTwit.save();
    } catch (err) {
      return err;
    }
  }


  /**
   * @description update reply for posts
   * @param {ObjectId} _id
   * @param {Object} reply
   * @return {array} Post
   */
  static async updateTwitWithReply(_id, reply) {
    return PostModel.findOneAndUpdate({ _id }, { $push: { replies: reply } }, { new: true, upsert: true });
  }

  /**
 * @description get user timelines
 * @param {ObjectId} userId
 * @param {integer} limit
 * @param {integer} offset
 * @return {array} posts
 */
  static async findPostsByUser(userId, limit, offset) {
    return PostModel.find({
      $or: [{ userId }, { 'replies.userId': userId }],
    })
      .skip(offset)
      .limit(limit)
      .sort({ updatedAt: 1 })
      .exec();
  }

  /**
* @description search twits
* @param {string} search term
 * @param {integer} limit
 * @param {integer} offset
 * @return {array} twits
 */
  static async search(searchTerm, limit, offset) {
    return PostModel.find({ $text: { $search: searchTerm } })
      .skip(offset)
      .limit(limit)
      .sort({ updatedAt: 1 })
      .exec();
  }
}
