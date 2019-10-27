import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

class Token {
  createJWT(id) {
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });
  }
}

export default new Token();
