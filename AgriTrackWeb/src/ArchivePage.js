
import React, { useState } from 'react';
import './ArchivePage.css'; // Make sure the CSS file is in the same directory

const ArchivePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Placeholder data for the groups
  const archiveData = {
    groupData: ['2018-2019', '2019-2020', '2020-2021', '2021-2022', '2022-2023'],
    financeData: ['2018-2019', '2019-2020', '2020-2021', '2021-2022', '2022-2023'],
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
          {archiveData.groupData.map((year, index) => (
            <div key={index} className="archive-item">
              {year}
            </div>
          ))}
        </div>
      </section>
      <section className="archive-section">
        <h2>Finance Data</h2>
        <div className="archive-grid">
          {archiveData.financeData.map((year, index) => (
            <div key={index} className="archive-item">
              {year}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArchivePage;
