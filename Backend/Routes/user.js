import express from "express";
import getUser, {  deleteUser, getAllUsers,getUserById,Updateuser } from "../Controller/user.js";

const router = express.Router();


router.post("/user", getUser);


router.get("/user",getAllUsers);

router.get("/user/:id", getUserById);

router.put("/user/:id", Updateuser);

router.delete('/user/:id',deleteUser);

export default router;

