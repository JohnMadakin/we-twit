import models from '../models';

const { UserModel } = models;

export default class UserService {
  /**
   * @description update verified column of a user model
   * @param {object} userObject - {
        email, password, name, username,
      }
   * @return {Promise} user
   */
  static async create(userObject) {
    try {
      const createUser = new UserModel(userObject);
      return createUser.save();
    } catch (err) {
      return err;
    }
  }

  /**
   * @description finds a user by email
   * @param {string} email
   * @return {Promise} user
   */
  static async findByEmail(email) {
    return UserModel.findOne({ email });
  }

  /**
 * @description finds a user by id
 * @param {string} id
 * @return {Promise} user
 */
  static async findById(id) {
    return UserModel.findById(id).select('-password');
  }


  /**
   * @description update verified column of a user model
   * @param {integer} username
   * @param {boolean} verify
   * @return {array} user
   */
  static async update(_id, verified) {
    return UserModel.findOneAndUpdate({ _id }, { verified }, { new: true });
  }

  /**
 * @description update following field of a user model
 * @param {object} _id
 * @param {object} following
 * @return {array} user
 */
  static async updateFollowing(_id, following) {
    return UserModel.findByIdAndUpdate(_id, { $addToSet: { following } }, { new: true, upsert: true });
  }

  /**
* @description update followers field of a user model
* @param {object} _id
* @param {object} following
* @return {array} user
*/
  static async updateFollowers(_id, followers) {
    return UserModel.findByIdAndUpdate(_id, { $addToSet: { followers } }, { new: true, upsert: true });
  }

  /**
* @description search user
* @param {string} search term
* @param {boolean} verify
* @return {array} user
*/
  static async search(searchTerm, limit, offset) {
    const reg = new RegExp(`^${searchTerm}`, 'i');
    return UserModel.find({ username: { $regex: reg } })
      .skip(offset)
      .limit(limit)
      .sort({ updatedAt: 1 })
      .select('username')
      .exec();
  }
}
