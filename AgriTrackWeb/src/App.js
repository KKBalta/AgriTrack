import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import GroupsPage from './GroupsPage';
import FinancePage from './FinancePage';
import ArchivePage from './ArchivePage';

import './App.css'; // Import the global styles

function App() {
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
            <Route path="/" element={<HomePage />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/finance" element={<FinancePage />} />
            <Route path="/archive" element={<ArchivePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
