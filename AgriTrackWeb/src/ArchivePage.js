import React, { useState, useEffect } from 'react';
import './ArchivePage.css';

const ArchivePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearsList, setYearsList] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  // Dummy archive data
  const archiveData = {
    groupData: [
      { id: '1', date: '2024-01-15', info: 'Data for 2024', pdfUrl: 'data/2024.pdf' },
      { id: '2', date: '2023-03-22', info: 'Data for 2023', pdfUrl: 'data/2023.pdf' },
      { id: '3', date: '2022-07-05', info: 'Data for 2022', pdfUrl: 'data/2022.pdf' },
      { id: '4', date: '2021-11-17', info: 'Data for 2017', pdfUrl: 'data/2021.pdf' }
      // ... add more data as needed
    ]
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  // Extract and sort the years when the component mounts or when archiveData changes
  useEffect(() => {
    if (archiveData && archiveData.groupData) {
      const groupYears = Array.from(new Set(
        archiveData.groupData
          .filter(entry => entry.date)
          .map(entry => entry.date.substring(0, 4))
      ));

      groupYears.sort((a, b) => b - a);
      setYearsList(groupYears);
    }
  }, [archiveData]);

  // Renders the group data for the selected year
  const renderGroupData = () => {
    return archiveData.groupData
      .filter(entry => entry.date && entry.date.startsWith(selectedYear))
      .map((entry, index) => (
        <div key={index} className="data-entry">
          <p>ID: {entry.id}</p>
          <p>Date: {entry.date}</p>
          <p>Info: {entry.info}</p>
          <a href={entry.pdfUrl} className="download-link" target="_blank" rel="noopener noreferrer">View PDF</a>
        </div>
      ));
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
          {yearsList.map((year, index) => (
            <div
              key={index}
              className={`archive-item ${year === selectedYear ? 'selected-year' : ''}`}
              onClick={() => handleYearClick(year)}
            >
              <strong>{`${year}-${parseInt(year) + 1}`}</strong>
              {year === selectedYear && (
                <div className="year-data">
                  {renderGroupData()}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Implement similar logic for displaying other archive sections if needed */}
    </div>
  );
};

export default ArchivePage;
