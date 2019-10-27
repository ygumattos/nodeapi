import mongoose from 'mongoose';

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
    senha: {
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

export default mongoose.model('User', UserSchema);
