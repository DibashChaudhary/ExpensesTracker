import express from "express";
import { insertTransaction, getUserTransations, deleteManyTransaction } from "../models/transactions/TransactionModel.js";

const router = express();

//read
router.get("/", async (req, res, next) =>{


    try {
        const { authorization } = req.headers;
        const trans = await getUserTransations({userId: authorization });
        res.json({
            status:"success",
            message:"get method to do",
            trans,
        })
    } catch (error) {
        next(error);
    }
})

//creates
router.post("/", async (req, res, next) =>{

    try {
        const {authorization} = req.headers
        const result = await insertTransaction({...req.body, userId:authorization})
        console.log(result)
        
        result?._id ?
        res.json({
            status:"success",
            message:"Transaction added succesfully",
        }) 
        : res.json({
            status:"success",
            message:"Unable to add please try again",
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
})

// delete
router.delete("/", async (req, res, next) => {
    try {
      console.log(req.body);
      const { authorization } = req.headers;
  
      const result = await deleteManyTransaction(req.body, authorization);
      console.log(result);
      result?.deletedCount
        ? res.json({
            status: "success",
            message: result.deletedCount + " item(s) delted ",
          })
        : res.json({
            status: "error",
            message: "Nothing happened",
          });
    } catch (error) {
      next(error);
    }
  });

export default router;