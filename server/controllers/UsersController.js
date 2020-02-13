import BaseController from './BaseController';
import UserService from '../services/UserService';
import errorhandler from '../helpers/errorHandler';

export default class UsersController extends BaseController {
  async followUser(req, res) {
    let message = '';
    try {
      const { followingUser, userId } = req;

      const result = await UserService.updateFollowing(userId, followingUser);
      message = 'Follow User Success';

      return super.successResponse(res, message, 200, {
        following: result._doc.following,
      });

    } catch (e) {
      message = 'Email Address or username already Exists';
      return errorhandler.sendErrorResponse({ message, statusCode: 400 }, res);
    }
  }
}
