// import jwt from 'jsonwebtoken';

// import authConfig from '../../config/auth';
import User from '../models/User';
import Telephone from '../models/Telephone';

class UserController {
  async store(req, res) {
    const [{ numero, ddd }] = req.body.telefone;
    const telephone = await Telephone.create({
      numero,
      ddd,
    });

    const user = await User.create({
      nome: req.body.nome,
      email: req.body.email,
      senha_hash: req.body.senha_hash,
      telefone: telephone._id,
      ultimo_login: new Date(),
    });

    await user.populate('telefone').execPopulate();

    const { _id, createdAt, updatedAt, ultimo_login, token } = user;

    return res.json({ _id, createdAt, updatedAt, ultimo_login, token });
  }
}

export default new UserController();
