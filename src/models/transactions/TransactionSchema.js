import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
        min: 1,
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required:true,
    },

},
    {
        timestamps:true,
    }
);

export default mongoose.model("Transaction", transactionSchema);