// GroupsPage.js
import React from 'react';
import './GroupsPage.css'; // Make sure to create and import the CSS file

const GroupsPage = () => {
  // Placeholder data for the table
  const groupData = [
    // Add your data objects here
    { id: 'TR17000032167', date: '28.12.2023', weight: '493', rate: '1.34' },
    // ... more data
  ];

  return (
    <div className="groups-page">
      <h1>Groups</h1>
      <table className="groups-table">
        <thead>
          <tr>
            <th>ID (Animal Ear Tag)</th>
            <th>Date</th>
            <th>Weight</th>
            <th>Daily Gaining Weight Rate</th>
          </tr>
        </thead>
        <tbody>
          {groupData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.id}</td>
              <td>{entry.date}</td>
              <td>{entry.weight}</td>
              <td>{entry.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Component Placeholder */}
      <div className="pagination">
        {/* Replace with actual pagination logic */}
        <button>«</button>
        <button>1</button>
        <button>2</button>
        {/* ... more buttons */}
        <button>»</button>
      </div>
    </div>
  );
};

export default GroupsPage;
