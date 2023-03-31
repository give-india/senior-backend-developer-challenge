import { Schema, model  } from 'mongoose';

import { AccountEntity, accountTypeEnum } from './interface';

const AccountSchema = new Schema<AccountEntity>(
    {
        balance:{
            type: Number,
            required:true,
            default:0
        },
        accountType:{
            type: String,
            enum: Object.values(accountTypeEnum),
            default: accountTypeEnum.savings, 
            required: true
        },
        user_id:{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }

    }, 
    { timestamps: true });




export const AccountModel = model<AccountEntity>('Account', AccountSchema);
