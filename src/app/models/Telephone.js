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
});

export default mongoose.model('Telephone', TelephoneSchema);
