const express = require('express');
const router = express.Router();
const SaleRecord = require('./AgriTrack/AgriTrackWeb/models/SalesRecord.js'); // Adjust the path as needed

// Middleware to get sale record by ID
async function getSaleRecord(req, res, next) {
    let saleRecord;
    try {
        saleRecord = await SaleRecord.findById(req.params.id);
        if (saleRecord == null) {
            return res.status(404).json({ message: 'Cannot find sale record' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.saleRecord = saleRecord;
    next();
}

// Get all sale records
router.get('/saleRecords', async (req, res) => {
    try {
        const saleRecords = await SaleRecord.find();
        res.json(saleRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get one sale record by id
router.get('/saleRecords/:id', getSaleRecord, (req, res) => {
    res.json(res.saleRecord);
});

// Create one sale record
router.post('/saleRecords', async (req, res) => {
    const saleRecord = new SaleRecord(req.body);
    try {
        const newSaleRecord = await saleRecord.save();
        res.status(201).json(newSaleRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update one sale record
router.patch('/saleRecords/:id', getSaleRecord, async (req, res) => {
    // Update fields if they exist in the request body
    Object.keys(req.body).forEach(key => {
        res.saleRecord[key] = req.body[key];
    });

    try {
        const updatedSaleRecord = await res.saleRecord.save();
        res.json(updatedSaleRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete one sale record
router.delete('/saleRecords/:id', getSaleRecord, async (req, res) => {
    try {
        await res.saleRecord.remove();
        res.json({ message: 'Deleted SaleRecord' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
