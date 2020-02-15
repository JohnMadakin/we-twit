import { Router } from 'express';
import PostController from '../controllers/PostTwitController';
import UserAuthMiddleware from '../middleware/UserAuth';
import ValidatorMiddleware from '../middleware/validators';

const twits = new PostController(process.env.BASE_URL);

const router = Router();

/**
 * @description post a twits
 * @param {string}
 * @param {function}
 */
router.post('/twits', UserAuthMiddleware.verifyUser, UserAuthMiddleware.checkIfSuspended, ValidatorMiddleware.validateTwits, twits.postTwit);

/**
 * @description reply a twits
 * @param {string}
 * @param {function}
 */
router.post('/twits/:id/reply', UserAuthMiddleware.verifyUser, UserAuthMiddleware.checkIfSuspended, ValidatorMiddleware.validateTwits, twits.replyTwit);

/**
 * @description view timelines
 * @param {string}
 * @param {function}
 */
router.get('/timelines', UserAuthMiddleware.verifyUser, UserAuthMiddleware.checkIfSuspended, twits.getTimelines);

/**
 * @description search tweets
 * @param {string}
 * @param {function}
 */
router.get('/search', twits.search);

export default router;
