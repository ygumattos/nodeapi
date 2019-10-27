import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

const UserSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    senha_hash: {
      type: String,
      required: true,
    },
    telefone: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Telephone',
      },
    ],
    token: {
      type: String,
    },
    ultimo_login: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Criptografando senha
const hashSenha = async function() {
  const user = this;
  if (user.isModified('senha_hash')) {
    const cryptSenha = await bcrypt.hash(this.senha_hash, 8);
    this.senha_hash = cryptSenha;
  }
};

// Criando token JWT

const tokenJWT = function() {
  this.token = jwt.sign({ id: this._id }, authConfig.secret, {
    expiresIn: authConfig.expiresIn,
  });
};

UserSchema.pre('save', hashSenha);
UserSchema.pre('save', tokenJWT);

// Função para comparar senha

// checkPassword(password){
//   return bcrypt.compare(password, this.password_hash);
// }

export default mongoose.model('User', UserSchema);
