// import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import { addMinutes, isAfter } from 'date-fns';
// import authConfig from '../../config/auth';
import User from '../models/User';
import Telephone from '../models/Telephone';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      senha: Yup.string().required(),
      telefone: Yup.array().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        messagem: 'Nome, e-mail, senha e telefone são obrigatórios ! ',
      });
    }

    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(302).json({ messagem: 'E-mail já existente !' });
    }

    const [{ numero, ddd }] = req.body.telefone;
    const telephone = await Telephone.create({
      numero,
      ddd,
    });

    const user = await User.create({
      nome: req.body.nome,
      email: req.body.email,
      senha_hash: req.body.senha,
      telefone: telephone._id,
      ultimo_login: new Date(),
    });

    await user.populate('telefone').execPopulate();

    const { _id, createdAt, updatedAt, ultimo_login, token } = user;

    return res
      .status(201)
      .json({ _id, createdAt, updatedAt, ultimo_login, token });
  }

  async index(req, res) {
    if (!(req.userID === req.params.id)) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    const user = await User.findById(req.userID);

    const dateWithSet = addMinutes(user.ultimo_login, 30);

    if (isAfter(new Date(), dateWithSet)) {
      return res.status(401).json({ mensagem: 'Sessão inválida' });
    }

    return res.json(user);
  }
}

export default new UserController();
