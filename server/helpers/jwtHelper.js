import jsonWebToken from 'jsonwebtoken';
import config from '../config/config';


/**
 * @description This class is for JWT token generation and verification
 */
class JWTHelper {
  /**
   * @description This function generates JWT tokens
   * @param {object} userObject
   * @param {string} duration time that a token has before becoming invalid
   * @returns {string} token
   */
  static generateToken(userObject, duration) {
    const token = jsonWebToken.sign({ user: userObject }, config.jwtSecret,
      { expiresIn: duration });
    return token;
  }

  /**
   * @description This function verifies and decodes JWT tokens
   * @param {string} userToken
   * @returns {Object} userObject
   */
  static verifyToken(userToken) {
    if (!userToken || typeof userToken !== 'string') {
      return false;
    }
    try {
      const decodedToken = jsonWebToken.verify(userToken, config.jwtSecret);
      return decodedToken;
    } catch (err) {
      return err;
    }
  }
}

export default JWTHelper;
