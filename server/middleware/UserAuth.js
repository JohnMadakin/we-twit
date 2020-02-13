import errorhandler from '../helpers/errorHandler';
import UserSevice from '../services/UserService';
import jwtHelper from '../helpers/jwtHelper';

export default class UserAuth {
  static async validateEmailExists(req, res, next) {
    const { body: { email } } = req;
    const message = 'Username is incorrect';
    const userFound = await UserSevice.findByEmail(email);
    if (!userFound) {
      return errorhandler.sendErrorResponse({ message, statusCode: 422 }, res);
    }
    return next();
  }

  static async verifyUser(req, res, next) {
    let message = 'UnAuthorized Access: Enter a token';
    try {
      const token = req.headers.authorization;
      if (!token) {
        return errorhandler.sendErrorResponse({ message, statusCode: 401 }, res);
      }
      const [bearer, userToken] = token.split(' ');
      const checkToken = jwtHelper.verifyToken(userToken);

      if (checkToken.name === 'TokenExpiredError') {
        message = 'Token TimedOut';
        return errorhandler.sendErrorResponse({ message, statusCode: 400 }, res);
      }
      if (checkToken.name === 'JsonWebTokenError') {
        message = 'Invalid Token';
        return errorhandler.sendErrorResponse({ message, statusCode: 400 }, res);
      }
      if (!checkToken.user) {
        message = 'Invalid Token';
        return errorhandler.sendErrorResponse({ message, statusCode: 400 }, res);
      }
      req.userId = checkToken.user._id;
      return next();
    } catch (error) {
      message = 'Invalid Token';
      return errorhandler.sendErrorResponse({ message, statusCode: 400 }, res);
    }
  }

  static async validateUserToFollow(req, res, next) {
    const { id } = req.params;
    let message = 'User not found';

    const result = await UserSevice.findById(id);
    if (!result) {
      return errorhandler.sendErrorResponse({ message, statusCode: 404 }, res);
    }

    if (req.userId == result._doc._id || result._doc.suspended) {
      message = 'Not a valid user to follow';
      return errorhandler.sendErrorResponse({ message, statusCode: 400 }, res);
    }

    req.followingUser = {
      id,
      username: result._doc.username,
    };
    return next();
  }

  static async checkIfFollowUserAlready(userId, id) {
    const result = await UserSevice.findById(userId);
    let shouldFollow = true;
    result._doc.following.map((user) => {
      if (user._id === id) {
        shouldFollow = false;
      }
      return user;
    });
    return shouldFollow;
  }
}
