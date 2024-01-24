//group.test.mjs
import mongoose from 'mongoose';
import { expect } from 'chai';
import Group from 'AgriTrack/AgriTrackWeb/models/group.js'; // Ensure this path is correct

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/AgriTrackData', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

describe('Group Model Test', () => {
    // Empty the database before each test
    beforeEach(async () => {
        await mongoose.connection.dropCollection('groups');
    });

    // Test the creation of a group
    it('creates a new group with weight entries', async () => {
        const group = new Group({
            name: 'Group1',
            animals: [
                {
                    id: 'Animal1',
                    weightEntries: [
                        { date: new Date(), weight: 150 }
                    ]
                }
            ]
        });

        await group.save();
        const record = await Group.findOne({ name: 'Group1' });
        expect(record).to.not.be.null;
        expect(record.name).to.equal('Group1');
        expect(record.animals.length).to.equal(1);
        expect(record.animals[0].id).to.equal('Animal1');
        expect(record.animals[0].weightEntries.length).to.equal(1);
        expect(record.animals[0].weightEntries[0].weight).to.equal(150);
    });

    // Test Reading of Groups
    it('retrieves a group correctly', async () => {
        const group = new Group({
            name: 'Group2',
            animals: []
        });

        await group.save();
        const record = await Group.findOne({ name: 'Group2' });
        expect(record).to.not.be.null;
        expect(record.name).to.equal('Group2');
    });

    // Test Updating of Groups
    it('updates a group correctly', async () => {
        const group = new Group({
            name: 'GroupToUpdate',
            animals: []
        });

        await group.save();
        await Group.updateOne({ name: 'GroupToUpdate' }, { $set: { name: 'GroupUpdated' } });
        const updatedGroup = await Group.findOne({ name: 'GroupUpdated' });
        expect(updatedGroup).to.not.be.null;
        expect(updatedGroup.name).to.equal('GroupUpdated');
    });

    // Test Deletion of Groups
    it('deletes a group correctly', async () => {
        const group = new Group({
            name: 'GroupToDelete',
            animals: []
        });

        await group.save();
        await Group.deleteOne({ name: 'GroupToDelete' });
        const deletedGroup = await Group.findOne({ name: 'GroupToDelete' });
        expect(deletedGroup).to.be.null;
    });

    // Close the Mongoose connection after all tests are done
     after((done) => {
        mongoose.connection.close()
            .then(() => done()) // Call done when the connection is closed
            .catch(err => done(err)); // Call done with error if there's an error
    });
});