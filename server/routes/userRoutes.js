import { Router } from 'express';
import dotenv from 'dotenv';

import AuthController from '../controllers/AuthController';
import UserAuthMiddleware from '../middleware/UserAuth';
import Validator from '../middleware/validators';

dotenv.config();
const router = Router();
const auth = new AuthController(process.env.VERIFYEMAIL_URL);

/**
 * @description creates a new user
 * @param {string}
 * @param {function}
 */
router.post('/signup', Validator.validateSignupData, auth.signup);

/**
 * @description login a user
 * @param {string}
 * @param {function}
 */
router.post('/login', UserAuthMiddleware.validateEmailExists, auth.signin);

router.get('/verifyemail', auth.verifyEmail);

export default router;
