import BaseController from './BaseController';
import PostService from '../services/PostService';
import errorhandler from '../helpers/errorHandler';


export default class PostTwitController extends BaseController {
  async postTwit(req, res) {
    let message = '';
    try {
      const { twits } = req.body;

      const result = await PostService.createNewTwit({ twits, userId: req.userId });
      message = 'Twit Successful';
      return super.successResponse(res, message, 200, {
        ...result._doc,
      });

    } catch (e) {
      console.log({e})
      message = 'Twit unsuccessful';
      return errorhandler.sendErrorResponse({ message, statusCode: 400 }, res);
    }
  }

  async replyTwit(req, res) {
    let message = '';
    try {
      const { reply } = req.body;
      const replyObject = {
        userId: req.userId,
        replyTwits: reply,
        date: new Date(),
      };
      const { id } = req.params;
      const result = await PostService.updateTwitWithReply(id, replyObject);
      message = 'Reply Twit Successful';
      return super.successResponse(res, message, 200, {
        ...result._doc,
      });

    } catch (e) {
      message = 'Twit unsuccessful';
      return errorhandler.sendErrorResponse({ message, statusCode: 400 }, res);
    }
  }
  
  async getTimelines(req, res) {
    let message = '';
    try {
      const page = req.query.page || 1;
      const limit = 50;
      const offset = (page - 1) * limit;

      const result = await PostService.findPostsByUser(req.userId, limit, offset);
      message = 'User Timelines';
      return super.successResponse(res, message, 200, result);

    } catch (e) {
      message = 'Twit unsuccessful';
      return errorhandler.sendErrorResponse({ message, statusCode: 400 }, res);
    }
  }

  async search(req, res) {
    let message = '';
    try {
      const page = req.query.page || 1;
      const limit = 50;
      const offset = (page - 1) * limit;
      const { twits } = req.query;

      const result = await PostService.search(twits, limit, offset);
      message = 'User Timelines';
      return super.successResponse(res, message, 200, result);

    } catch (e) {
      message = 'Twit unsuccessful';
      return errorhandler.sendErrorResponse({ message, statusCode: 400 }, res);
    }
  }

}
