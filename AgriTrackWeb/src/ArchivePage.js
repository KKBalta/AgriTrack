import React, { useState, useEffect } from 'react';
import './ArchivePage.css'; // Make sure the CSS file is in the same directory

const ArchivePage = ({ groupData }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // State to hold the list of years based on groupData
  const [yearsList, setYearsList] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // Check if groupData is defined before processing it
    if (groupData) {
      // Extract the years from groupData and remove duplicates
      const uniqueYears = Array.from(new Set(groupData.map((entry) => entry.date.substring(0, 4))));
    
      // Sort the years in descending order
      uniqueYears.sort((a, b) => b - a);
    
      // Update the yearsList state
      setYearsList(uniqueYears);
    }
  }, [groupData]);

  return (
    <div className="archive-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="ID Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={() => console.log('Search functionality to be implemented')}>Search</button>
      </div>
      <section className="archive-section">
        <h2>Group Data</h2>
        <div className="archive-grid">
          {groupData ? (
            yearsList.map((year, index) => (
              <div key={index} className="archive-item">
                {year}
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </section>
      {/* You can include a similar section for Finance Data */}
    </div>
  );
};

export default ArchivePage;
