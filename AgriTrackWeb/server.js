const express = require('express');
const app = express();
const connectDB = require('./database'); // Import the connectDB function
const groupRoutes = require('./Routes/groupRoutes'); // Adjust the path as needed
const saleRecordRoutes = require('./Routes/saleRecordRoutes'); // Adjust the path as needed

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());
// Use groupRoutes and saleRecordRoutes with '/api' prefix
app.use('/api', groupRoutes);
app.use('/api', saleRecordRoutes);

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
