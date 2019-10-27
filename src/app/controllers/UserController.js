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
      senha: req.body.senha,
      telefone: telephone._id,
    });

    await user.populate('telefone').execPopulate();

    return res.json(user);
  }
}

export default new UserController();
