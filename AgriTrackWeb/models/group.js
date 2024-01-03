const mongoose = require('mongoose');

const weightEntrySchema = new mongoose.Schema({
  date: Date,
  weight: Number
});

const animalSchema = new mongoose.Schema({
  id: String,
  weightEntries: [weightEntrySchema],
  // ... other animal-specific attributes
});

const groupSchema = new mongoose.Schema({
  name: String,
  animals: [animalSchema],
  // ... other group-specific attributes
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
