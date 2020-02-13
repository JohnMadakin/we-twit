import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import UserAuthMiddleware from '../middleware/UserAuth';

const user = new UsersController(process.env.VERIFYEMAIL_URL);

const router = Router();

// /**
//  * @description creates a new user
//  * @param {string}
//  * @param {function}
//  */
// router.post('', Validator.validateSignupData, auth.signup);

/**
 * @description follow a user
 * @param {string}
 * @param {function}
 */
router.post('/follow/:id', UserAuthMiddleware.verifyUser, UserAuthMiddleware.validateUserToFollow, user.followUser);

export default router;
