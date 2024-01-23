// saleRecord.test.mjs
import { expect } from 'chai';
import mongoose from 'mongoose';
import SaleRecord from '/Users/kaanbalta/Documents/ITU_doc/fall/ise_304/AgriTrack/AgriTrackWeb/models/SalesRecord.js'; // Update this path as needed

// Connect to a test database
mongoose.connect('mongodb://localhost:27017/AgriTrackData', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Top-level describe block
describe('SaleRecord', function() {
    this.timeout(10000); // Timeout of 10 seconds for all tests and hooks in this describe block

    before(async function() {
        // Clear the SaleRecord collection before the tests
        await SaleRecord.deleteMany({});
    });

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

        const expectedTotal = (543.6 * 98) + (543.6 * 98 * 0.01);
        expect(saleRecord.calculateTotal()).to.be.closeTo(expectedTotal, 0.001);
    });

    // Add more tests for each method
    it('should calculate the average price correctly', function() {
        // ...test implementation...
    });

    // ...other tests...

    after(function(done) {
        // Close the mongoose connection after all tests are done
        mongoose.connection.close(() => done());
    });
});
