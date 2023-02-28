import { model, Schema, Document } from 'mongoose';
import { Account } from '@/interfaces/accounts.interface';

const accountSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  balance: {
    type: Number,
    default:0,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  }
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

const accountModel = model<Account & Document>('Account', accountSchema);

export default accountModel;
