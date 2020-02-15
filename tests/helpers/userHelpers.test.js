import userHelpers from '../../server/helpers/userHelpers';
describe('User Helpers Test', () => {

  describe('Hash password test', () => {
    it('should return hashed equivalent of string passed', async () => {
      const result = await userHelpers.hashPassword('abc123');
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result).not.toBe('abc123')
    })
  });

  describe('check hashed password test', () => {
    it('should return true if password matches hash', async () => {
      const hash = '$2a$13$jmqf7pbKr7BEDbbFugNpqulq8PFmTI3mfxAgMsgD0XVZdyfir45y2';
      const result = await userHelpers.checkHashedPassword('abc123', hash);
      expect(result).toBeDefined();
      expect(typeof result).toBe('boolean');
      expect(result).toBe(true)
    });

    it('should return false if password does not matche hash', async () => {
      const hash = '$2a$13$jmqf7pbKr7BEDbbFugNpqulq8PFmTI3mfxAgMsgD0XVZdyfir45y2';
      const result = await userHelpers.checkHashedPassword('abc12378', hash);
      expect(result).toBeDefined();
      expect(typeof result).toBe('boolean');
      expect(result).toBe(false)
    })

  })

  describe('strip password test', () => {
    it('should strip object of password and timestam', async () => {
      const object = {
        firstname: 'dafe',
        lastname: 'omare',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: '1224445',
      };
      const result = await userHelpers.stripPassword(object);
      expect(result.password).toBeUndefined();
      expect(result.createdAt).toBeUndefined();
      expect(result.updatedAt).toBeUndefined();
      expect(result).not.toEqual(object);

    });

    it('should return objects without change if they dont contain password or timestamps', async () => {
      const object = {
        firstname: 'dafe',
        lastname: 'omare',
      };
      const result = await userHelpers.stripPassword(object);
      expect(result).toEqual(object);
    })

  })


});
