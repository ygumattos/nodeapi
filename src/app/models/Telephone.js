import mongoose from 'mongoose';

const TelephoneSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true,
  },
  ddd: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('Telephone', TelephoneSchema);
