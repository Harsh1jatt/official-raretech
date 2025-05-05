import React, { useState } from 'react';
import axios from 'axios';
import './css/Certificate.css';

const Certificate = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fetching, setFetching] = useState(false);

  const handleSearch = async () => {
    if (!rollNumber.trim()) {
      setError('Please enter a roll number');
      return;
    }

    setError('');
    setLoading(true);
    setFetching(true);
    try {
      const response = await axios.get(`https://iems.onrender.com/institute/certificate/${rollNumber}`);
      console.log(response.data);
      setFiles([response.data.certificate, response.data.marksheet]);
      setCurrentIndex(0);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch files');
      setFiles([]);
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  const nextFile = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % files.length);
  };

  const prevFile = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + files.length) % files.length);
  };

  return (
    <div>
      <div className="top">
        <h1>Certificate Verification</h1>
      </div>
      <h2>Enter your roll number below to view and download the certificate and marksheet</h2>
      <div className="search">
        <input
          type="search"
          placeholder="Enter Your Roll Number"
          className="search-input input"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
        <button className='btn' onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {fetching && <p className="loading-message">Loading certificate...</p>}
      {files.length > 0 && !fetching && (
        <div className="certificate-container">
          <h3>{currentIndex === 0 ? 'Certificate' : 'Marksheet'}</h3>
          <img src={files[currentIndex].fileUrl} alt="Document" className="file-preview" />
          <div className="navigation-buttons">
            <button className="download-button" onClick={prevFile} disabled={files.length < 2}>Previous</button>
            <a href={files[currentIndex].fileUrl} download className="download-button">Download</a>
            <button className="download-button" onClick={nextFile} disabled={files.length < 2}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificate;
