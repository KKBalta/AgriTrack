import React from 'react';
import './HomePage.css';

function HomePage({ animalCount }) {
  // The animalCount is now received as a prop from GroupHomePageParent

  return (
    <div className="homepage">
      <div className="dashboard-content">
        <div className="card revenue">
          <p>Revenue</p>
          <div className="chart-placeholder">Chart will go here</div>
        </div>
        <div className="card animals">
          <p>Animals</p>
          {/* Use the animalCount prop directly */}
          <div className="number-placeholder">{animalCount}</div>
        </div>
        <div className="card map">
          <p>Farm Map</p>
          <div className="map-placeholder">Map will go here</div>
        </div>
        <div className="card finance">
          <p>Finance</p>
          <div className="finance-placeholder">Graph will go here</div>
        </div>
        <div className="card archive">
          <p>Archive</p>
          <div className="archive-placeholder">Files will go here</div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
