import BaseController from './BaseController';

class PostTwitController extends BaseController {
  static createBudget(req, res) {
    return super.successResponse(res, 'Budget Created', 200);
  }

  static viewBudget(req, res) {
    const budget = {
      food: 900,
      transport: 1000,
    };
    const user = {
      name: 'dafe',
    }
    return super.successResponse(res, 'Success', 200, {
      budget,
      user,
    });
  }
}
