import mongoose from 'mongoose'

const walletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  balance: {
    type: Number,
    default: 400
  }
}, {
    timestamps: true
});

let Dataset = mongoose.models.wallet || mongoose.model('wallet', walletSchema)
export default Dataset
