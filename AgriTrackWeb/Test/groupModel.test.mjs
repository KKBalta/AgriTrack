import mongoose from 'mongoose';
import * as chai from 'chai'; // Change this line
const expect = chai.expect;

import Group from '/Users/kaanbalta/Documents/ITU_doc/fall/ise_304/AgriTrack/AgriTrackWeb/models/group.js'; // Ensure this path is correct

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/AgriTrackData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

describe('Group Model Test', () => {
  // Empty the database before each test
  beforeEach((done) => {
    mongoose.connection.collections.groups.drop(() => {
      done();
    });
  });

  // Test the creation of a group
  it('creates a new group with weight entries', (done) => {
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

    group.save().then(() => {
      Group.findOne({ name: 'Group1' })
        .then((record) => {
          expect(record.animals.length).to.equal(1);
          expect(record.animals[0].weightEntries.length).to.equal(1);
          done();
        });
    });
  });

  // ... more tests ...
});

// Close the Mongoose connection after all tests are done
after((done) => {
  mongoose.connection.close(() => done());
});
