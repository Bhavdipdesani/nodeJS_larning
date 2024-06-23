const express = require('express');
const router = express.Router();

const Parson = require('./../models/Parson');


router.post('/', async (req, res) => {
    try {
        const data = req.body;

        const newParson = new Parson(data);

        const response = await newParson.save();
        console.log('data saved');
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// get method  to get the person
router.get('/', async (req, res) => {
    try {
        const data = await Parson.find();
        console.log('data fetched');
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/:workTypy', async (req, res) => {
    try {
        const workTypy = req.params.workTypy;
        if (workTypy == 'chef' || workTypy == 'waiter' || workTypy == 'manager') {
            const response = await Parson.find({ work: workTypy });
            console.log('response fetched');
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.put("/:id", async (req, res) => {
    try {
        const parsonId = req.params.id;
        const updateParsonData = req.body;

        const response = await Parson.findByIdAndUpdate(parsonId, updateParsonData, {
            new: true,
            runValidators: true,
        });
        if (!response) {
            res.status(404).json({ error: "Parson not found" })
        }

        console.log('data updated');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})


router.delete('/:id', async (req, res) => {
    try {

        const parsonId = req.params.id;

        const response = await Parson.findByIdAndDelete(parsonId);

        if (!response) {
            res.status(404).json({ error: "Parson not found" })
        }

        console.log('data deleted');
        res.status(200).json({ message: 'Parson Deleted Successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;