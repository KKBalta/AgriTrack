import React, { useState, useEffect } from 'react';
import './GroupsPage.css';

export default function GroupsPage() {
  const [formData, setFormData] = useState({
    id: '',
    date: '',
    weight: '',
    rate: '',
  });
  const [groupData, setGroupData] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 20;

  // Calculate the current entries to display
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = groupData.slice(indexOfFirstEntry, indexOfLastEntry);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(groupData.length / entriesPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const storedData = localStorage.getItem('groupData');
    if (storedData) {
      setGroupData(JSON.parse(storedData));
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEntry = {
      id: formData.id,
      date: formData.date,
      weight: formData.weight,
      rate: formData.rate,
    };
    const updatedGroupData = [...groupData, newEntry];
    setGroupData(updatedGroupData);
    localStorage.setItem('groupData', JSON.stringify(updatedGroupData));
    setShowCreateForm(false);
    setFormData({ id: '', date: '', weight: '', rate: '' });
  };

  const handleRowClick = (identifier) => {
    setSelectedId(identifier);
  };

  const handleCreateClick = () => {
    setShowCreateForm(true);
  };

  const handleDelete = () => {
    const updatedGroupData = groupData.filter((entry, index) => {
      const identifier = entry.id || `empty-${index}`;
      return identifier !== selectedId;
    });
    setGroupData(updatedGroupData);
    localStorage.setItem('groupData', JSON.stringify(updatedGroupData));
    setSelectedId(null);
  };
  return (
    <div className="groups-page">
      <h1>Groups</h1>
  
      {showCreateForm && (
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>ID (Animal Ear Tag)</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Weight</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Daily Gaining Weight Rate</label>
            <input
              type="text"
              name="rate"
              value={formData.rate}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
  
      <table className="groups-table">
        <thead>
          <tr className="table-headers">
            <th>ID (Animal Ear Tag)</th>
            <th>Date</th>
            <th>Weight</th>
            <th>Daily Gaining Weight Rate</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((entry, index) => {
            const identifier = entry.id || `empty-${index}`;
            return (
              <tr key={identifier} onClick={() => handleRowClick(identifier)} className={selectedId === identifier ? 'selected-row' : ''}>
                <td>{entry.id || 'N/A'}</td>
                <td>{entry.date || 'N/A'}</td>
                <td>{entry.weight || 'N/A'}</td>
                <td>{entry.rate || 'N/A'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
  
      <div className="table-footer">
        <div className="button-group">
          {!showCreateForm && (
            <button onClick={handleCreateClick} className="create-button">
              Create Entry
            </button>
          )}
  
          <button onClick={handleDelete} disabled={!selectedId} className="delete-button">
            Delete Selected
          </button>
        </div>
  
        <div className="pagination">
          {pageNumbers.map(number => (
            <button key={number} onClick={() => paginate(number)}>
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
  
        }  