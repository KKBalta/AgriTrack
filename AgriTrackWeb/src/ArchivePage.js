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
      { id: '4', date: '2021-11-17', info: 'Data for 2021', pdfUrl: 'data/2021.pdf' }
      // ... add more data as needed
    ],
    financeData: [
      { id: 'F1', date: '2024-01-15', info: 'Finance Report for 2024', pdfUrl: 'data/finance-2021.pdf' },
      { id: 'F2', date: '2023-03-22', info: 'Finance Report for 2023', pdfUrl: 'data/finance-2023.pdf' },
      // ... add more finance data as needed
    ]
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    if (archiveData && archiveData.groupData) {
      const groupYears = Array.from(new Set(
        [...archiveData.groupData, ...archiveData.financeData]
          .filter(entry => entry.date)
          .map(entry => entry.date.substring(0, 4))
      ));

      groupYears.sort((a, b) => b - a);
      setYearsList(groupYears);
    }
  }, [archiveData]);

  const renderData = (data) => {
    return data
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
                  {renderData(archiveData.groupData)}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="archive-section">
        <h2>Finance Data</h2>
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
                  {renderData(archiveData.financeData)}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArchivePage;
