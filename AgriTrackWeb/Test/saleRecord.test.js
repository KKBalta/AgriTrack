const mongoose = require('mongoose');
const SaleRecord = require('/Users/kaanbalta/Documents/ITU_doc/fall/ise_304/AgriTrack/AgriTrackWeb/models/group.js'); // Ensure this path is correct
const chai = require('chai');
const expect = chai.expect;

// Connect to a test database
mongoose.connect('mongodb://localhost:27017/testDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

describe('SaleRecord', function() {
  it('should calculate the total correctly', function() {
    const saleRecord = new SaleRecord({
      cost: 7000,
      quantity: 2,
      date: new Date('2021-12-20'),
      carcassWeightKg: 543.6,
      price: 98,
      tax: 1,
      feedDayCount: 184,
      dailyFeedCost: 30.4,
    });

    // Assuming calculateTotal() computes the total cost including tax
    // and that the tax is represented as a percentage (1% in this case).
    const expectedTotal = (543.6 * 98) + (543.6 * 98 * 0.01);
    expect(saleRecord.calculateTotal()).to.be.closeTo(expectedTotal, 0.001); // Use closeTo for floating-point comparison
  });

  // Add more tests for each method
  it('should calculate the average price correctly', function() {
    // ...test implementation...
  });

  // ...other tests...
});

// After all tests are done, close the database connection
after(function(done) {
  mongoose.connection.close(done);
});
