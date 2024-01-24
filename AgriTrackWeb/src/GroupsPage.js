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
  const [selectedIds, setSelectedIds] = useState([]);
  const [showModifyForm, setShowModifyForm] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

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

  const calculateDailyRate = (id, date, weight) => {
    // Find the last entry for the given ID
    const lastEntry = groupData
      .filter((entry) => entry.id === id)
      .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

    if (lastEntry) {
      const lastWeight = parseFloat(lastEntry.weight);
      const currentDate = new Date(date);
      const lastDate = new Date(lastEntry.date);
      const daysDifference = (currentDate - lastDate) / (1000 * 60 * 60 * 24);

      if (daysDifference > 0) {
        const dailyRate = (weight - lastWeight) / daysDifference;
        return isNaN(dailyRate) ? 0 : dailyRate.toFixed(2);
      }
    }

    return 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedRowIndex !== -1) {
      const updatedGroupData = [...groupData];
      updatedGroupData[selectedRowIndex] = formData;
      setGroupData(updatedGroupData);
      localStorage.setItem('groupData', JSON.stringify(updatedGroupData));
      setSelectedRowIndex(-1);
      setShowModifyForm(false);
    } else {
      const { id, date, weight } = formData;
      const dailyRate = calculateDailyRate(id, date, weight);
      const newEntry = {
        id,
        date,
        weight,
        rate: dailyRate,
      };
      const updatedGroupData = [...groupData, newEntry];
      setGroupData(updatedGroupData);
      localStorage.setItem('groupData', JSON.stringify(updatedGroupData));
    }

    setShowCreateForm(false);
    setFormData({ id: '', date: '', weight: '', rate: 0 });
    const year = formData.date.substring(0, 4);
    updateArchiveData(year, 'groupData');
  };

  const handleRowClick = (identifier) => {
    if (selectedIds.includes(identifier)) {
      setSelectedIds(selectedIds.filter((id) => id !== identifier));
    } else {
      setSelectedIds([...selectedIds, identifier]);
    }
  };

  const handleCreateClick = () => {
    if (showCreateForm) {
      setShowCreateForm(false);
      setShowModifyForm(false);
    } else {
      setFormData({ id: '', date: '', weight: '', rate: 0 });
      setShowCreateForm(true);
    }
  };

  const handleModifyClick = () => {
    if (selectedIds.length === 1) {
      const selectedId = selectedIds[0];
      const selectedIndex = groupData.findIndex((entry) => entry.id === selectedId);

      if (selectedIndex !== -1) {
        const entryToModify = groupData[selectedIndex];
        setFormData(entryToModify);
        setSelectedRowIndex(selectedIndex);
        setShowCreateForm(true);
        setShowModifyForm(true);
      }
    } else {
      alert('Please select exactly one item to modify.');
    }
  };

  const handleDelete = () => {
    if (selectedIds.length > 0) {
      const confirmDelete = window.confirm('Are you sure you want to delete the selected rows?');
      if (confirmDelete) {
        const updatedGroupData = groupData.filter((entry, index) => {
          const identifier = entry.id || `empty-${index}`;
          return !selectedIds.includes(identifier);
        });
        setGroupData(updatedGroupData);
        localStorage.setItem('groupData', JSON.stringify(updatedGroupData));
        setSelectedIds([]);
      }
    } else {
      alert('Please select rows to delete.');
    }
  };

// ...

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
            readOnly={selectedRowIndex !== -1}
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
            readOnly={selectedRowIndex !== -1}
          />
        </div>
        <button type="submit" className="save-changes-button">
          {selectedRowIndex !== -1 ? 'Save Changes' : 'Save'}
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
              className={selectedIds.includes(entry.id || `empty-${index}`) ? 'selected-row' : ''}
              onClick={() => handleRowClick(entry.id || `empty-${index}`)}
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
      <button onClick={handleModifyClick} className="modify-button">
        ✏️ Modify
      </button>
      <button
        onClick={handleDelete}
        disabled={selectedIds.length === 0}
        className="delete-button"
      >
        🗑️ Delete
      </button>
    </div>
  </div>
);

}
