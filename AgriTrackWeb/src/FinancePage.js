import React, { useState, useEffect } from 'react';
import './GroupsPage.css';

export default function GroupsPage({ updateArchiveData }) {
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    kg: '',
    price: '',
    kdv: '',
    total: '',
    foderDay: '',
    foderDailyPrice: '',
    profit: '',
  });
  const [groupData, setGroupData] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEntry = {
      date: formData.date,
      amount: formData.amount,
      kg: formData.kg,
      price: formData.price,
      kdv: formData.kdv,
      total: formData.total,
      foderDay: formData.foderDay,
      foderDailyPrice: formData.foderDailyPrice,
      profit: formData.profit,
    };
    const updatedGroupData = [...groupData, newEntry];
    setGroupData(updatedGroupData);
    localStorage.setItem('groupData', JSON.stringify(updatedGroupData));
    setShowCreateForm(false);
    setFormData({
      date: '',
      amount: '',
      kg: '',
      price: '',
      kdv: '',
      total: '',
      foderDay: '',
      foderDailyPrice: '',
      profit: '',
    });

    const year = newEntry.date.substring(0, 4);
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
    setShowCreateForm(true);
  };

  const handleDelete = () => {
    if (selectedIds.length > 0) {
      const confirmDelete = window.confirm("Are you sure you want to delete the selected rows?");
      if (confirmDelete) {
        const updatedGroupData = groupData.filter((entry, index) => {
          const identifier = entry.date || `empty-${index}`;
          return !selectedIds.includes(identifier);
        });
        setGroupData(updatedGroupData);
        localStorage.setItem('groupData', JSON.stringify(updatedGroupData));
        setSelectedIds([]);
      }
    } else {
      alert("Please select rows to delete.");
    }
  };

  return (
    <div className="groups-page">
      <h1>Finance</h1>
      {showCreateForm && (
        <form onSubmit={handleSubmit}>
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
            <label>Amount</label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>KG</label>
            <input
              type="text"
              name="kg"
              value={formData.kg}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>KDV</label>
            <input
              type="text"
              name="kdv"
              value={formData.kdv}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Total</label>
            <input
              type="text"
              name="total"
              value={formData.total}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Foder Day</label>
            <input
              type="text"
              name="foderDay"
              value={formData.foderDay}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Foder Daily Price</label>
            <input
              type="text"
              name="foderDailyPrice"
              value={formData.foderDailyPrice}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label>Profit</label>
            <input
              type="text"
              name="profit"
              value={formData.profit}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">➕ Create</button>
        </form>
      )}

      <table className="groups-table">
        <thead>
          <tr className="table-headers">
            <th>Date</th>
            <th>Amount</th>
            <th>KG</th>
            <th>Price</th>
            <th>KDV</th>
            <th>Total</th>
            <th>Foder Day</th>
            <th>Foder Daily Price</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((entry, index) => {
            const identifier = entry.date || `empty-${index}`;
            return (
              <tr
                key={identifier}
                onClick={() => handleRowClick(identifier)}
                className={selectedIds.includes(identifier) ? 'selected-row' : ''}
              >
                <td>{entry.date || 'N/A'}</td>
                <td>{entry.amount || 'N/A'}</td>
                <td>{entry.kg || 'N/A'}</td>
                <td>{entry.price || 'N/A'}</td>
                <td>{entry.kdv || 'N/A'}</td>
                <td>{entry.total || 'N/A'}</td>
                <td>{entry.foderDay || 'N/A'}</td>
                <td>{entry.foderDailyPrice || 'N/A'}</td>
                <td>{entry.profit || 'N/A'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="table-footer">
        <div className="button-group">
          {!showCreateForm && (
            <button onClick={handleCreateClick} className="create-button">
              ➕ Create
            </button>
          )}

          <button
            onClick={handleDelete}
            disabled={selectedIds.length === 0}
            className="delete-button"
          >
            🗑️ Delete
          </button>
        </div>

        <div className="pagination">
          {pageNumbers.map((number) => (
            <button key={number} onClick={() => paginate(number)}>
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
