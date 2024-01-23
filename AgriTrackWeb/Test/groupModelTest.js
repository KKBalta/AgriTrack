const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;

const Group = require('../path/to/Group'); // Update with the path to your Group model

// Connect to MongoDB
mongoose.connect('mongodb://localhost/testdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
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
