import React, { useState, useEffect } from 'react';
import './FinancePage.css';

export default function FinancePage({ updateArchiveData }) {
  const [formData, setFormData] = useState({
    id: null,
    date: '',
    amount: '',
    kg: '',
    price: '',
    kdv: '',
    animalPurchasePrice: '',
    foderDay: '',
    foderDailyPrice: '',
  });
  const [financeData, setFinanceData] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = financeData.slice(indexOfFirstEntry, indexOfLastEntry);

  const handleDelete = () => {
    if (selectedIds.length > 0) {
      const confirmDelete = window.confirm("Are you sure you want to delete the selected row(s)?");
      if (confirmDelete) {
        const updatedFinanceData = financeData.filter((entry) => {
          const identifier = entry.id;
          return !selectedIds.includes(identifier);
        });
        setFinanceData(updatedFinanceData);
        localStorage.setItem('financeData', JSON.stringify(updatedFinanceData));
        setSelectedIds([]);
      }
    } else {
      alert("Please select rows to delete.");
    }
  };
  
  useEffect(() => {
    const storedData = localStorage.getItem('financeData');
    if (storedData) {
      setFinanceData(JSON.parse(storedData));
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    if (selectedIds.length === 1) {
      const entryToEdit = financeData.find(entry => entry.id === selectedIds[0]);
      if (entryToEdit) {
        setFormData(entryToEdit);
        setShowCreateForm(true);
      }
    } else {
      alert("Please select exactly one item to edit.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEntry = {
      id: formData.id || Date.now(),
      date: formData.date,
      amount: formData.amount,
      kg: formData.kg,
      price: formData.price,
      kdv: formData.kdv,
      animalPurchasePrice: formData.animalPurchasePrice,
      foderDay: formData.foderDay,
      foderDailyPrice: formData.foderDailyPrice,
    };

    let updatedFinanceData;
    if (formData.id) {
      updatedFinanceData = financeData.map((item) => 
        item.id === formData.id ? newEntry : item
      );
    } else {
      updatedFinanceData = [...financeData, newEntry];
    }

    setFinanceData(updatedFinanceData);
    localStorage.setItem('financeData', JSON.stringify(updatedFinanceData));
    setShowCreateForm(false);
    setFormData({
      id: null,
      date: '',
      amount: '',
      kg: '',
      price: '',
      kdv: '',
      animalPurchasePrice: '',
      foderDay: '',
      foderDailyPrice: '',
    });

    const year = newEntry.date.substring(0, 4);
    updateArchiveData(year, 'financeData');
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
      // If the form is already visible, cancel it
      setShowCreateForm(false);
    } else {
      // If the form is not visible, show it
      setFormData({
        id: null,
        date: '',
        amount: '',
        kg: '',
        price: '',
        kdv: '',
        animalPurchasePrice: '',
        foderDay: '',
        foderDailyPrice: '',
      });
      setShowCreateForm(true);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(financeData.length / entriesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="finance-page">
      <h1>Finance</h1>
      {showCreateForm && (
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Amount</label>
            <input type="text" name="amount" value={formData.amount} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>KG</label>
            <input type="text" name="kg" value={formData.kg} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Price</label>
            <input type="text" name="price" value={formData.price} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>KDV</label>
            <input type="text" name="kdv" value={formData.kdv} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Animal Purchase Price</label>
            <input type="text" name="animalPurchasePrice" value={formData.animalPurchasePrice} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Foder Day</label>
            <input type="text" name="foderDay" value={formData.foderDay} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Foder Daily Price</label>
            <input type="text" name="foderDailyPrice" value={formData.foderDailyPrice} onChange={handleInputChange} />
          </div>
          <button type="submit" className="finance-create-button">
            {formData.id ? 'Save Changes' : 'Create'}
          </button>
        </form>
      )}
  
      <table className="finance-table">
        <thead>
          <tr className="finance-table-headers">
            <th>Date</th>
            <th>Animal Purchase Price</th>
            <th>Amount</th>
            <th>KG</th>
            <th>Price</th>
            <th>Total</th>
            <th>KDV</th>
            <th>Foder Day</th>
            <th>Foder Daily Price</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((entry, index) => {
            const identifier = entry.id || `empty-${index}`; // Assuming each entry has a unique 'id'
            return (
              <tr
                key={identifier}
                onClick={() => handleRowClick(identifier)}
                className={selectedIds.includes(identifier) ? 'selected-row' : ''}
              >
                <td>{entry.date || 'N/A'}</td>
                <td>{entry.animalPurchasePrice || 'N/A'}</td>
                <td>{entry.amount || 'N/A'}</td>
                <td>{entry.kg || 'N/A'}</td>
                <td>{entry.price || 'N/A'}</td>
                <td>{entry.total || 'N/A'}</td>
                <td>{entry.kdv || 'N/A'}</td>
                <td>{entry.foderDay || 'N/A'}</td>
                <td>{entry.foderDailyPrice || 'N/A'}</td>
                <td>{entry.profit || 'N/A'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
  
      <div className="finance-table-footer">
        <div className="finance-button-group">
          <button onClick={handleCreateClick} className="finance-create-button">
            {showCreateForm ? 'Cancel' : '➕ Create'}
          </button>
          <button onClick={handleEditClick} className="finance-modify-button">
            ✏️ Modify
          </button>
          <button
            onClick={handleDelete}
            disabled={selectedIds.length === 0}
            className="finance-delete-button">
            🗑️ Delete
          </button>
        </div>
  
        <div className="finance-pagination">
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
