import React, { useState } from 'react';
import { searchParts } from '../services/apiService';

const InputForm = ({ setResults }) => {
  const [partNumber, setPartNumber] = useState('');
  const [volume, setVolume] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const results = await searchParts(partNumber, volume);
    setResults(results);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label htmlFor="partNumber">Part Number</label>
        <input
          type="text"
          className="form-control"
          id="partNumber"
          value={partNumber}
          onChange={(e) => setPartNumber(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="volume">Volume</label>
        <input
          type="number"
          className="form-control"
          id="volume"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  );
};

export default InputForm;
