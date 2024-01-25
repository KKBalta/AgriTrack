import React, { useEffect, useState } from 'react';
import './HomePage.css'; // Make sure to create and import the CSS file

function HomePage() {
  // State to store unique IDs
  const [uniqueIds, setUniqueIds] = useState([]);

  useEffect(() => {
    // Retrieve group data from local storage
    const storedData = localStorage.getItem('groupData');
    if (storedData) {
      const groupData = JSON.parse(storedData);

      // Extract unique IDs from group data
      const ids = [...new Set(groupData.map(entry => entry.id))];
      setUniqueIds(ids);
    }
  }, []);

  return (
    <div className="homepage">
      <div className="dashboard-content">
        <div className="card archive">
          <p>Animal Count</p>
          <div className="archive-placeholder">
            <p style={{ fontSize: '36px', color: 'green' }}>{uniqueIds.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
