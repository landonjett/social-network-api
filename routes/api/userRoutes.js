const router = require('express').Router();
const User = require('../../models/User');

// GET all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.find().select('-__v');
        res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET a single user by _id
router.get('/:userId', async (req, res) => {
    try {
        const userData = await User.findOne({ _id: req.params.userId }).select('-__v');

        if (!userData) {
            return res.status(404).json({ message: 'No user found with that ID' });
        }

        // Populate thoughts separately
        await userData.populate('thoughts').execPopulate(); 
        await userData.populate('friends').execPopulate(); // Populate friends as well 

        res.status(200).json(userData); 
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// POST a new user
router.post('/', async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const userData = await User.create(req.body);
        res.status(201).json(userData);
    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.username) {
            // Duplicate username error
            res.status(400).json({ message: 'Username already exists' });
        } else {
            console.log(err);
            res.status(500).json(err);
        }
    }
});

// PUT to update a user by _id
router.put('/:userId', async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId }, 
            req.body,
            { new: true, runValidators: true }
        );

        if (!userData) {
            return res.status(404).json({ message: 'No user found with that ID' });
        }
        res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// DELETE to remove a user by _id
router.delete('/:userId', async (req, res) => {
    try {
        const userData = await User.findOneAndDelete({ _id: req.params.userId });

        if (!userData) {
            return res.status(404).json({ message: 'No user found with that ID' });
        }
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Add/Remove friends routes 
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } }, 
            { new: true, runValidators: true }
        );

        if (!userData) {
            return res.status(404).json({ message: 'No user found with that ID' });
        }
        res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } }, 
            { new: true, runValidators: true  } 
        );

        if (!userData) {
            return res.status(404).json({ message: 'No user found with that ID' });
        }
        res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
