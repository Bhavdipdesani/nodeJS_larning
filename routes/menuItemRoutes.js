const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/MenuItem');

router.post('/', async (req, res) => {
    try {
        const data = req.body;

        const newMenuItem = new MenuItem(data);

        const response = await newMenuItem.save();
        console.log('data saved');
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste;
        if (taste == "Sweet" || taste == "Spicy" || taste == "Sour") {
            const response = await MenuItem.find({ taste: taste });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid Taste' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internl server error' });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const MenuItemId = req.params.id;
        const updateMenuItemData = req.body;

        const response = await MenuItem.findByIdAndUpdate(MenuItemId, updateMenuItemData, {
            new: true,
            runValidators: true,
        })
        if (!response) {
            res.status(404).json({ error: 'MenuItem not found' });
        }
        console.log('MenuItem updated');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const MenuItemId = req.params.id;

        const response = await MenuItem.findByIdAndDelete(MenuItemId);

        if (!response) {
            res.status(404).json({ error: 'Menuitme not found' });
        }
        console.log('MenuItem deleted');
        res.status(200).json({ message: 'MenuItem Deleted Successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
})
module.exports = router;