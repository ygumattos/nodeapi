import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

UserSchema.pre('save', hashSenha);

// Função para comparar senha

// checkPassword(password){
//   return bcrypt.compare(password, this.password_hash);
// }

export default mongoose.model('User', UserSchema);
