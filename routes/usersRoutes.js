const express = require('express');
const router = express.Router();

const Users = require('./../models/Users');

router.post('/', async (req, res) => {
    try {
        const data = req.body;

        const newUser = new Users(data);

        const response = await newUser.save();
        console.log('data saved');
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/', async (req, res) => {
    try {
        const response = await Users.find();
        console.log('data fetched');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updateUserData = req.body;

        const response = await Users.findByIdAndUpdate(userId, updateUserData, {
            new: true,
            runValidators: true
        })
        if (!response) {
            res.status(404).json({ error: "User not found" });
        }
        console.log("data fetched");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).status({ error: "Internal server error" });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const response = await Users.findByIdAndDelete(userId);

        if (!response) {
            res.status(404).json({ error: "User not found" });
        }

        console.log("data fetched");
        res.status(200).json({ message: "User Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})
module.exports = router;