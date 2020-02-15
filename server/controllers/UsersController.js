import BaseController from './BaseController';
import UserService from '../services/UserService';
import errorhandler from '../helpers/errorHandler';

export default class UsersController extends BaseController {
  async followUser(req, res) {
    let message = '';
    try {
      const { followingUser, userId , username } = req;

      const result = await UserService.updateFollowing(userId, followingUser);
      message = 'Follow User Success';
      await UserService.updateFollowers(followingUser.id, { id: userId, username });
      return super.successResponse(res, message, 200, {
        following: result._doc.following,
      });

    } catch (e) {
      message = 'Email Address or username already Exists';
      return errorhandler.sendErrorResponse({ message, statusCode: 400 }, res);
    }
  }

  async search(req, res) {
    let message = 'users found';
    try {
      const page = req.query.page || 1;
      const limit = 50;
      const offset = (page - 1) * limit;
      const { username } = req.query;
      let code = 200;
      const result = await UserService.search(username, limit, offset);
      if (!result.length) {
        code = 400;
        message = 'no users found';
      }

      return super.successResponse(res, message, code, result);
    } catch (e) {
      message = 'user search unsuccessful';
      return errorhandler.sendErrorResponse({ message, statusCode: 400 }, res);
    }
  }
}
