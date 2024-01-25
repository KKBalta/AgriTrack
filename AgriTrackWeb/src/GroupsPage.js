import React, { useState, useEffect } from 'react';
import './GroupsPage.css';

export default function GroupsPage({ updateArchiveData }) {
  const [formData, setFormData] = useState({
    id: '',
    date: '',
    weight: '',
    rate: 0, // Initialize rate as 0
  });
  const [groupData, setGroupData] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModifyForm, setShowModifyForm] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 20;

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = groupData.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const { id, date, weight } = formData;
  
    let updatedGroupData = [...groupData];
  
    if (selectedRow !== null) {
      // Update the selected entry
      updatedGroupData[selectedRow] = { ...updatedGroupData[selectedRow], ...formData };
    } else {
      // Create a new entry and add it to the group data
      updatedGroupData.push({ id, date, weight, rate: 0 }); // Initial rate is set to 0 and will be recalculated
    }
  
    // Recalculate rates for all entries with the same ID
    const relatedEntries = updatedGroupData.filter(entry => entry.id === id);
    relatedEntries.sort((a, b) => new Date(a.date) - new Date(b.date));
  
    for (let i = 0; i < relatedEntries.length; i++) {
      if (i === 0) {
        // The first entry won't have a previous entry to compare with
        relatedEntries[i].rate = "N/A";
      } else {
        const previousEntry = relatedEntries[i - 1];
        const daysDifference = (new Date(relatedEntries[i].date) - new Date(previousEntry.date)) / (1000 * 60 * 60 * 24);
        if (daysDifference > 0) {
          const dailyRate = (relatedEntries[i].weight - previousEntry.weight) / daysDifference;
          relatedEntries[i].rate = isNaN(dailyRate) ? 0 : dailyRate.toFixed(2);
        } else {
          relatedEntries[i].rate = "N/A"; // If dates are the same or invalid, rate cannot be calculated
        }
      }
    }
  
    // Update the main groupData array with recalculated rates
    updatedGroupData = updatedGroupData.map(entry => {
      const relatedEntry = relatedEntries.find(e => e.date === entry.date && e.id === entry.id);
      return relatedEntry || entry;
    });
  
    setGroupData(updatedGroupData);
    localStorage.setItem('groupData', JSON.stringify(updatedGroupData));
    setSelectedRow(null);
    setShowModifyForm(false);
    setShowCreateForm(false);
    setFormData({ id: '', date: '', weight: '', rate: 0 });
    const year = formData.date.substring(0, 4);
    updateArchiveData(year, 'groupData');
  };
  

const handleRowClick = (index) => {
  if (selectedRow === index) {
    setSelectedRow(null);
  } else {
    setSelectedRow(index);
  }
};

  
  

  const handleCreateClick = () => {
    setShowCreateForm((prevShowCreateForm) => !prevShowCreateForm);
    setShowModifyForm(false);
    if (!showCreateForm) {
      setFormData({ id: '', date: '', weight: '', rate: 0 });
    }
  };

  const handleModifyClick = () => {
    if (selectedRow !== null) {
      const entryToModify = groupData[selectedRow];
      setFormData(entryToModify);
      setShowCreateForm(true);
      setShowModifyForm(true);
    } else {
      alert('Please select exactly one item to modify.');
    }
  };

  const handleDelete = () => {
    if (selectedRow !== null) {
      const confirmDelete = window.confirm('Are you sure you want to delete the selected row?');
      if (confirmDelete) {
        const updatedGroupData = groupData.filter((_, index) => index !== selectedRow);
        setGroupData(updatedGroupData);
        localStorage.setItem('groupData', JSON.stringify(updatedGroupData));
        setSelectedRow(null);
      }
    } else {
      alert('Please select a row to delete.');
    }
  };
  return (
    <div className="groups-page">
      <h1>Groups</h1>
  
      {showCreateForm || showModifyForm ? (
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>ID (Animal Ear Tag)</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              readOnly={selectedRow !== null}
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
          <button type="submit" className="save-changes-button">
            {selectedRow !== null ? 'Save Changes' : 'Save'}
          </button>
        </form>
      ) : null}
  
      <div className="form-and-table-container">
        <table className="groups-table">
          <thead>
            <tr className="table-headers">
              <th>ID</th>
              <th>Date</th>
              <th>Weight</th>
              <th>Daily Gaining Weight Rate</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((entry, index) => (
              <tr
                key={index}
                className={selectedRow === index ? 'selected-row' : ''}
                onClick={() => handleRowClick(index)}
              >
                <td>{entry.id}</td>
                <td>{entry.date}</td>
                <td>{entry.weight}</td>
                <td>{entry.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      <div className="button-group">
        {!showCreateForm && (
          <button onClick={handleCreateClick} className="create-button">
            ➕ Create
          </button>
        )}
        {showCreateForm && (
          <button onClick={handleCreateClick} className="cancel-button">
            Cancel
          </button>
        )}
        <button onClick={handleModifyClick} className="modify-button" disabled={selectedRow === null}>
          ✏️ Modify
        </button>
        <button
          onClick={handleDelete}
          disabled={selectedRow === null}
          className="delete-button"
        >
          🗑️ Delete
        </button>
      </div>
  
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
  
}
