const router = require('express').Router();
const Thought = require('../../models/Thought');
const User = require('../../models/User');

 // Import User directly


// GET all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughtData = await Thought.find()
            .populate({ path: 'reactions' }); 
        res.status(200).json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET a single thought by _id
router.get('/:thoughtId', async (req, res) => {
    try {
        const thoughtData = await Thought.findOne({ _id: req.params.thoughtId })
            .populate({ path: 'reactions' });

        if (!thoughtData) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }
        res.status(200).json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// POST to create a new thought (and push to the user's thoughts array)
router.post('/', async (req, res) => {
    try {
        console.log('Thought constructor:', Thought); 
        const thoughtData = await new Thought(req.body).save();
        
        // Update the User 
        const userData = await User.findOneAndUpdate(
            { _id: req.body.userId }, 
            { $addToSet: { thoughts: thoughtData._id } }, 
            { new: true } 
        );
        
        // Success - but no need to return the updated User data
        if (!userData) {
            return res.status(404).json({ message: 'No user found with that ID' }); 
        }
        
        res.status(200).json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// PUT to update a thought by _id
router.put('/:thoughtId', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId }, 
            req.body, 
            { new: true, runValidators: true }
        );

        if (!thoughtData) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }
        res.status(200).json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// DELETE to remove a thought by _id
router.delete('/:thoughtId', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thoughtData) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }

        // Update the User to remove the thought 
        await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId }, // Find user with the thought
            { $pull: { thoughts: req.params.thoughtId } }, // Remove the thought
            { new: true } 
        );

        res.status(200).json({ message: 'Thought deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Create/Delete reactions routes
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true, runValidators: true }
        );

        if (!thoughtData) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }
        res.status(200).json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true, runValidators: true }
        );

        if (!thoughtData) {
            return res.status(404).json({ message: 'No thought found with that ID' });
        }
        res.status(200).json(thoughtData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router; 
