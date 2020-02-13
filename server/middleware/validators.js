import validator from 'validator';
import ErrorHandler from '../helpers/errorHandler';

export default class Validators {
  static validateSignupData(req, res, next) {
    const userData = req.body;
    const invalidData = [];
    const validKeys = ['password', 'username', 'firstName', 'lastName', 'email'];
    const payloadList = Object.keys(userData);
    const statusCode = 422;

    payloadList.map((value) => {
      const validateKeys = validKeys.indexOf(value);
      if (validateKeys === -1) {
        invalidData.push(`${value} is an invalid key name`);
      }

      if (value === 'email' && !validator.isEmail(userData[value])) {
        invalidData.push(`${userData[value]} is an invalid email`);
      }
      if (value === 'firstName' && !validator.isEmpty(userData[value]) && !validator.isAlpha(userData[value])) {
        invalidData.push(`${userData[value]} is an invalid firstName`);
      }
      if (value === 'username' && !validator.isEmpty(userData[value]) && userData[value].length < 3) {
        invalidData.push(`${userData[value]} is an invalid username`);
      }

      if (value === 'lastName' && !validator.isEmpty(userData[value]) && !validator.isAlpha(userData[value])) {
        invalidData.push(`${userData[value]} is an invalid lastName`);
      }
      if (value === 'password' && !validator.isByteLength(userData[value], 8)) {
        invalidData.push(`${userData[value]} is an invalid password`);
      }
      return true;
    });

    if (invalidData.length > 0) {
      const message = invalidData;
      return ErrorHandler.sendErrorResponse({ message, statusCode }, res);
    }
    return next();
  }
}
