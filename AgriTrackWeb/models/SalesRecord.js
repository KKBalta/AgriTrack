const mongoose = require('mongoose');

const saleRecordSchema = new mongoose.Schema({
  cost: { type: Number, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, required: true },
  carcassWeightKg: { type: Number, required: true }, // Assuming 'Karkas(kg)' is the carcass weight
  price: { type: Number, required: true }, // Assuming this is the price before tax
  tax: { type: Number, required: true },
  feedDayCount: { type: Number, required: true },
  dailyFeedCost: { type: Number, required: true },
});


saleRecordSchema.methods.calculateTotalPrice = function() {
  const taxedPrice = this.calculateTotal();
  const feedCost = this.calculateTotalFeedCost();
  return taxedPrice - feedCost;
};

// Instance method to calculate total amount
saleRecordSchema.methods.calculateTotal = function() {
  return this.carcassWeightKg * this.price  + (this.carcassWeightKg * this.price * (this.tax / 100));
};

saleRecordSchema.methods.calculateTotalAvaragePrice = function() {
  const taxedPrice = this.calculateTotal();
  return taxedPrice / this.quantity;
};

// Instance method to calculate total feed cost
saleRecordSchema.methods.calculateTotalFeedCost = function() {
  return this.feedDayCount * this.dailyFeedCost;
};

// Instance method to calculate cost per animal
saleRecordSchema.methods.calculateCostPerAnimal = function() {
  return this.calculateTotalFeedCost() / this.quantity;
};

// Instance method to calculate total cost per animal
saleRecordSchema.methods.calculateTotalCostPerAnimal = function() {
  const tprice = this.calculateTotal() - ((this.calculateTotalFeedCost() + this.cost) * this.quantity);
  return tprice / this.quantity;
};

saleRecordSchema.methods.calculateTotalCostTotalAnimal = function() {
  return this.calculateTotal() - ((this.calculateTotalFeedCost() + this.cost) * this.quantity);
};




const SaleRecord = mongoose.model('SaleRecord', saleRecordSchema);

module.exports = SaleRecord;
