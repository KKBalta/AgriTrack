import React, { useState, useEffect } from 'react';
import './ArchivePage.css';

const ArchivePage = ({ archiveData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearsList, setYearsList] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    // Check if archiveData is defined before processing it
    if (archiveData) {
      // Extract the years from groupData and remove duplicates
      const groupYears = Array.from(new Set(archiveData.groupData
        .filter(entry => entry.date) // Filter out entries without a date property
        .map((entry) => entry.date.substring(0, 4))
      ));

      // Sort the years in descending order
      groupYears.sort((a, b) => b - a);

      // Update the yearsList state
      setYearsList(groupYears);
    }
  }, [archiveData]);

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
          {yearsList.map((year, index) => (
            <div
              key={index}
              className={`archive-item ${year === selectedYear ? 'selected-year' : ''}`}
              onClick={() => handleYearClick(year)}
            >
              <strong>{`${year}-${parseInt(year) + 1}`}</strong>
              {year === selectedYear && (
                <ul>
                  {archiveData.groupData
                    .filter(entry => entry.date && entry.date.startsWith(year)) // Filter by date
                    .map((entry, entryIndex) => (
                      <li key={entryIndex}>{/* Render entry details here */}</li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="archive-section">
        <h2>Finance Archive</h2>
        {/* Add similar code for displaying Finance Archive */}
      </section>
    </div>
  );
};

export default ArchivePage;
