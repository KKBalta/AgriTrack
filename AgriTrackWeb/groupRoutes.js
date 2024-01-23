const express = require('express');
const router = express.Router();
const Group = require('/Users/kaanbalta/Documents/ITU_doc/fall/ise_304/AgriTrack/AgriTrackWeb/models/group'); // adjust the path as needed

// Get all groups
router.get('/groups', async (req, res) => {
    try {
        const groups = await Group.find();
        res.json(groups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get one group by id
router.get('/groups/:id', getGroup, (req, res) => {
    res.json(res.group);
});

// Create one group
router.post('/groups', async (req, res) => {
    const group = new Group(req.body);
    try {
        const newGroup = await group.save();
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update one group
router.patch('/groups/:id', getGroup, async (req, res) => {
    if (req.body.name != null) {
        res.group.name = req.body.name;
    }
    try {
        const updatedGroup = await res.group.save();
        res.json(updatedGroup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete one group
router.delete('/groups/:id', getGroup, async (req, res) => {
    try {
        await res.group.remove();
        res.json({ message: 'Deleted Group' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware to get group by ID
async function getGroup(req, res, next) {
    let group;
    try {
        group = await Group.findById(req.params.id);
        if (group == null) {
            return res.status(404).json({ message: 'Cannot find group' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.group = group;
    next();
}

module.exports = router;
