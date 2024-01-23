import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import GroupsPage from './GroupsPage';
import FinancePage from './FinancePage';
import ArchivePage from './ArchivePage';

import './App.css'; // Import the global styles

function App() {
  const [archiveData, setArchiveData] = useState({
    groupData: [],
    financeData: [],
  });

  // Function to update archiveData
  const updateArchiveData = (year, category) => {
    setArchiveData((prevData) => ({
      ...prevData,
      [category]: [...prevData[category], year],
    }));
  };

  return (
    <Router>
      <div className="App">
        {/* Header component */}
        <header className="header">
          <h1>AgriTrack</h1>
          <img src="/logo.png" alt="AgriTrack Logo" style={{ height: '50px' }} /> {/* Logo added here */}
          {/* You can add more header elements here, like a search bar or user icon */}
        </header>
        
        {/* Sidebar component */}
        <aside className="sidebar">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/groups">Groups</Link></li>
              <li><Link to="/finance">Finance</Link></li>
              <li><Link to="/archive">Archive</Link></li>
            </ul>
          </nav>
        </aside>

        {/* Main content area */}
        <main className="content">
          <Routes>
            <Route
              path="/groups"
              element={<GroupsPage updateArchiveData={updateArchiveData} />} // Pass the updateArchiveData function as a prop
            />
            <Route path="/finance" element={<FinancePage />} />
            <Route path="/archive" element={<ArchivePage archiveData={archiveData} />} /> {/* Pass archiveData as a prop */}
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
