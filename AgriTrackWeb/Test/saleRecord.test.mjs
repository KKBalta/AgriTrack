// saleRecord.test.mjs
import { expect } from 'chai';
import mongoose from 'mongoose';
import SaleRecord from 'AgriTrack/AgriTrackWeb/models/SalesRecord.js'; // Update this path as needed

describe('SaleRecord', function() {
    this.timeout(30000); // Timeout of 30 seconds for all tests and hooks in this describe block

    let saleRecord; // Define saleRecord in a broader scope

    before(async function() {
        // Connect to a test database
        await mongoose.connect('mongodb://localhost:27017/AgriTrackData', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log("Connected to Database");
        }).catch((err) => {
            console.error("An error occurred while connecting to the database:", err);
            throw err; // If connection fails, throw the error to stop the tests
        });

        // Create a SaleRecord instance for testing
        saleRecord = new SaleRecord({
            cost: 7000,
            quantity: 2,
            date: new Date('2021-12-20'),
            carcassWeightKg: 543.6,
            price: 98,
            tax: 1,
            feedDayCount: 184,
            dailyFeedCost: 30.4,
        });

        // Clear the SaleRecord collection before the tests
        await SaleRecord.deleteMany({});
    });

    it('should calculate the total correctly', function() {
        const expectedTotal = (543.6 * 98) + (543.6 * 98 * 0.01);
        expect(saleRecord.calculateTotal()).to.be.closeTo(expectedTotal, 0.001);
    });

    // Add more tests for each method
    it('should calculate the total price correctly', function() {
        const expectedTotalPrice = saleRecord.calculateTotal() - saleRecord.calculateTotalFeedCost();
        expect(saleRecord.calculateTotalPrice()).to.be.closeTo(expectedTotalPrice, 0.001);
    });

    it('should calculate the total feed cost correctly', function() {
        const expectedFeedCost = 184 * 30.4;
        expect(saleRecord.calculateTotalFeedCost()).to.be.closeTo(expectedFeedCost, 0.001);
    });

    it('should calculate the cost per animal correctly', function() {
        const expectedCostPerAnimal = saleRecord.calculateTotalFeedCost() / saleRecord.quantity;
        expect(saleRecord.calculateCostPerAnimal()).to.be.closeTo(expectedCostPerAnimal, 0.001);
    });

    it('should calculate the total cost per animal correctly',  function() {
        const totalCost = saleRecord.calculateTotal();
        const totalFeedCost = saleRecord.calculateTotalFeedCost();
        const expectedTotalCostPerAnimal = (totalCost - ((totalFeedCost + saleRecord.cost) * saleRecord.quantity)) / saleRecord.quantity;
        expect(saleRecord.calculateTotalCostPerAnimal()).to.be.closeTo(expectedTotalCostPerAnimal, 0.001);
    });

    it('should calculate the total cost for all animals correctly',  function() {
        const totalCost = saleRecord.calculateTotal();
        const totalFeedCost = saleRecord.calculateTotalFeedCost();
        const expectedTotalCostTotalAnimal = totalCost - ((totalFeedCost + saleRecord.cost) * saleRecord.quantity);
        expect(saleRecord.calculateTotalCostTotalAnimal()).to.be.closeTo(expectedTotalCostTotalAnimal, 0.001);
    });

    after(async function() {
        // Properly close the Mongoose connection
        await mongoose.connection.close();
    });
});