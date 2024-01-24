const express = require('express');
const router = express.Router();
const Group = require('/Users/kaanbalta/Documents/ITU_doc/fall/ise_304/AgriTrack/AgriTrackWeb/models/group'); // Adjust the path as needed

// Middleware to get group by ID
async function getGroup(req, res, next) {
    let group;
    try {
        group = await Group.findById(req.params.groupId);
        if (group == null) {
            return res.status(404).json({ message: 'Cannot find group' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.group = group;
    next();
}

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
router.get('/groups/:groupId', getGroup, (req, res) => {
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
router.patch('/groups/:groupId', getGroup, async (req, res) => {
    if (req.body.name != null) {
        res.group.name = req.body.name;
    }
    // Include additional fields as necessary
    try {
        const updatedGroup = await res.group.save();
        res.json(updatedGroup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete one group
router.delete('/groups/:groupId', getGroup, async (req, res) => {
    try {
        await res.group.remove();
        res.json({ message: 'Deleted Group' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add an animal to a specific group
router.post('/groups/:groupId/animals', getGroup, async (req, res) => {
    const animal = req.body; // Assuming the animal details are in the request body
    res.group.animals.push(animal); // Add the animal to the group's animals array
    try {
        const updatedGroup = await res.group.save();
        res.status(201).json(updatedGroup);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a specific animal in a group
router.patch('/groups/:groupId/animals/:animalId', getGroup, async (req, res) => {
    const { animalId } = req.params;
    const animalUpdates = req.body; // Assuming the updates are in the request body
    const animal = res.group.animals.id(animalId); // Find the animal by ID
    if (animal) {
        Object.assign(animal, animalUpdates); // Update the animal details
        try {
            const updatedGroup = await res.group.save();
            res.json(updatedGroup);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else {
        res.status(404).json({ message: 'Animal not found' });
    }
});

// Add a weight entry to a specific animal in a group
router.post('/groups/:groupId/animals/:animalId/weightEntries', getGroup, async (req, res) => {
    const { animalId } = req.params;
    const weightEntry = req.body; // Assuming the weight entry details are in the request body
    const animal = res.group.animals.id(animalId); // Find the animal by ID
    if (animal) {
        animal.weightEntries.push(weightEntry); // Add the weight entry
        try {
            const updatedGroup = await res.group.save();
            res.status(201).json(updatedGroup);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    } else {
        res.status(404).json({ message: 'Animal not found' });
    }
});

module.exports = router;
