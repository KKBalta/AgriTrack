import React, { useState } from 'react';
import './GroupsPage.css';

export default function GroupsPage() {
  const [formData, setFormData] = useState({
    id: '',
    date: '',
    weight: '',
    rate: '',
  });
  const [groupData, setGroupData] = useState([]);

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
      id: formData.id,
      date: formData.date,
      weight: formData.weight,
      rate: formData.rate,
    };
    setGroupData((prevGroupData) => [...prevGroupData, newEntry]);
    setFormData({
      id: '',
      date: '',
      weight: '',
      rate: '',
    });
  };

  return (
    <div className="groups-page">
      <h1>Groups</h1>
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
        <button type="submit">Create</button>
      </form>
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
          {groupData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.id}</td>
              <td>{entry.date}</td>
              <td>{entry.weight}</td>
              <td>{entry.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination component */}
    </div>
  );
}
