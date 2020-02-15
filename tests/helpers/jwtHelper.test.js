import jwtHelpers from '../../server/helpers/jwtHelper';
describe('JWT Helpers Test', () => {

  describe('verify token test', () => {
    it('should return false if no token is provided', async () => {
      const result = await jwtHelpers.verifyToken();
      expect(result).toBe(false);

    })

  it('should return false if token is not string', async () => {
    const result = await jwtHelpers.verifyToken(3344334);
    expect(result).toBe(false);
  })

  it('should return verify token', async () => {
    const token = await jwtHelpers.generateToken({ username: 'bvn', password: 'a'}, 10000);

    const result = await jwtHelpers.verifyToken(token);
    expect(result).toBeTruthy();
    expect(result.user).toEqual({ username: 'bvn', password: 'a' });
  })

});

  describe('generate token test', () => {
    it('should return truthy value', async () => {
      const token = await jwtHelpers.generateToken({ username: 'bs', password: 'a' }, 10000);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });
  })

});
