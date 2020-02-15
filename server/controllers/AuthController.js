import BaseController from './BaseController';

import UserService from '../services/UserService';
import UserHelpers from '../helpers/userHelpers';
import errorhandler from '../helpers/errorHandler';
import emailTemplate from '../helpers/emailTemplate';
import JWTHelper from '../helpers/jwtHelper';

const duration = 3600;

export default class AuthController extends BaseController {
  constructor(linkUrl) {
    super(linkUrl);
    this.signup = this.signup.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
  }

  /**
   * @description user signup controller
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  async signup(req, res, next) {
    try {
      const {
        body: {
          email, password: userPassword, firstName, lastName, username,
        },
      } = req;

      const result = await UserService.create({
        email,
        password: await UserHelpers.hashPassword(userPassword),
        name: `${firstName.trim()} ${lastName.trim()}`,
        username,
      });
      const message = 'Signup Successfull. Please Verify your email address';

      const userData = UserHelpers.stripPassword(result._doc);

      const token = JWTHelper.generateToken(userData, duration);
      this.linkUrl = `${this.linkUrl}?token=${token}&email=${result.email}`;
      super.sendNotificationEmail(result.email, emailTemplate.verification);

      return super.successResponse(res, message, 201, { token });
    } catch (err) {
      const statusCode = 422;
      // let message = '';

      if (err.code === 11000) {
        // message = 'Email Address or username already Exists';
        return errorhandler.sendErrorResponse({ message: err.message, statusCode }, res);
      }
      // err.message = 'Some error occured';
      return next(err);
    }
  }

  /**
   * @description user signup controller
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  async signin(req, res, next) {
    try {
      const { body: { email, password } } = req;
      let message = '';
      const statusCode = 422;

      const userFound = await UserService.findByEmail(email);

      const { password: hashedPassword } = userFound;
      const isPasswordCorrect = await
      UserHelpers.checkHashedPassword(password, hashedPassword);

      if (!isPasswordCorrect) {
        message = 'Password is incorrect';
        return errorhandler.sendErrorResponse({ message, statusCode }, res);
      }

      const userDetails = UserHelpers.stripPassword(userFound._doc);

      const token = JWTHelper.generateToken(userDetails, duration);
      message = 'Login Successful';
      return super.successResponse(res, message, 200, { token });
    } catch (err) {
      return next(err);
    }
  }

  /**
   *@description this function verify the email of a user
   * @param {object} req request to the sent
   * @param {object} res respond gotten form server
   * @param {object} next  callback funtion
   * @returns {object} an object when the email is successfully verified
   */
  async verifyEmail(req, res, next) {
    const { query: { token, email } } = req;
    let message = 'Email successfully confirmed';
    try {
      const decodedToken = JWTHelper.verifyToken(token);

      if (decodedToken.message) {
        const userFound = await UserService.findByEmail(email);

        const newToken = JWTHelper.generateToken(userFound._doc.email, duration);
        this.linkUrl = `${process.env.VERIFYEMAIL_URL}?token=${newToken}&email=${email}`;
        super.sendNotificationEmail(email, emailTemplate.verification);
        message = 'Token has Expired. A new verification link have been sent';
        return errorhandler.sendErrorResponse({ message, statusCode: 400 }, res);
      }

      const { user: { _id, email: userEmail } } = decodedToken;
      const verifiedUser = await UserService.update(_id, true);
      const userDetails = UserHelpers.stripPassword(verifiedUser._doc);

      const userToken = JWTHelper.generateToken(userDetails, duration);
      super.sendNotificationEmail(userEmail, emailTemplate.confirmation);
      return super.successResponse(res, message, 200, userToken);
    } catch (err) {
      return next(err);
    }
  }
}
