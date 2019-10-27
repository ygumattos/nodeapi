import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

import Token from '../methods/token';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      senha: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'E-mail e senha são obrigatórios !' });
    }

    const { email, senha } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Usuário inválido !' });
    }

    if (!(await bcrypt.compare(senha, user.senha_hash))) {
      return res.status(401).json({ error: 'Senha incorreta !' });
    }

    const newToken = Token.createJWT(user._id);

    await user.updateOne({ ultimo_login: new Date(), token: newToken });

    const { _id, createdAt, updatedAt, ultimo_login, token } = user;

    return res
      .status(200)
      .json({ _id, createdAt, updatedAt, ultimo_login, token });
  }
}

export default new SessionController();
