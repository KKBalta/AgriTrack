import React from 'react';
import './HomePage.css';

function HomePage({ animalCount, revenue }) {
  // The animalCount and revenue are now received as props

  return (
    <div className="homepage">
      <div className="dashboard-content">
        <div className="card revenue">
          <p>Revenue</p>
          <div className="number-placeholder">{revenue}</div>
        </div>
        <div className="card animals">
          <p>Animals</p>
          <div className="number-placeholder">{animalCount}</div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
