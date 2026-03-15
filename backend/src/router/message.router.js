import express from "express";

const router = express.Router();

router.get("/send", (req, res)=>{
    res.send("Message sending endpoint");
});

router.get("/receive", (req, res)=>{
    res.send("Message Receiving endpoint");
});

export default router;