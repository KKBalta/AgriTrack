import React from 'react';
import './FinancePage.css'; // Make sure the CSS file is in the same directory

const FinancePage = () => {
  // Placeholder data for the table
  const financeData = [
    // Add your data objects here
    { date: '3/7/22', amount: 1, kg: 65, price: 35, /* ...other data... */ },
    // ... more data
  ];

  return (
    <div className="finance-page">
      <table className="finance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>KG</th>
            <th>Price</th>
            {/* ...other headers... */}
          </tr>
        </thead>
        <tbody>
          {financeData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.amount}</td>
              <td>{entry.kg}</td>
              <td>{entry.price}</td>
              {/* ...other data cells... */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination placeholder */}
      <div className="pagination">
        {/* Pagination logic will go here */}
      </div>
    </div>
  );
};

export default FinancePage;
