import React from 'react';
import './HomePage.css'; // Make sure to create and import the CSS file

function HomePage() {
  return (
    <div className="homepage">
      <div className="dashboard-content">
        <div className="card revenue">
          <p>Revenue</p>
          <div className="chart-placeholder">Chart will go here</div>
        </div>
        <div className="card animals">
          <p>Animals</p>
          <div className="number-placeholder">576</div>
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
