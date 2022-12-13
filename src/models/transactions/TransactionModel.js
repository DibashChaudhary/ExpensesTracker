import TransactionSchema from './TransactionSchema.js';

//CRUD

//Insert
export const insertTransaction=obj => {
    return TransactionSchema(obj).save()
}

//read all transaction 
export const getUserTransations = ( filter) => {
    return TransactionSchema.find(filter);
}

// Delete
export const deleteManyTransaction = (ids, userId) => {
    return TransactionSchema.deleteMany({
      _id: {
        $in: ids,
      },
      userId,
    });
  };