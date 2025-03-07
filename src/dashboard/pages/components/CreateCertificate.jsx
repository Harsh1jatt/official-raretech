import React, { useState } from "react";
import axios from "axios";
import "./css/CreateCertificate.css";

const CreateCertificate = ({ isOpen, onClose, student }) => {
  const [formData, setFormData] = useState({
    certificate: null,
    marksheet: null,
  });
  const [previews, setPreviews] = useState({ certificate: null, marksheet: null });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      setPreviews((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.certificate || !formData.marksheet) {
      alert("Please upload both certificate and marksheet.");
      return;
    }
    
    const data = new FormData();
    data.append("certificate", formData.certificate);
    data.append("marksheet", formData.marksheet);
    
    try {
      const response = await axios.post(
        `https://iems.onrender.com/institute/${student._id}/upload-certificate`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(response.data.message);
      onClose();
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload certificate and marksheet.");
    }
  };

  const handleReset = () => {
    setFormData({ certificate: null, marksheet: null });
    setPreviews({ certificate: null, marksheet: null });
    document.querySelectorAll('input[type="file"]').forEach(input => (input.value = ""));
  };

  if (!isOpen || !student) return null;

  return (
    <div className="certificate-overlay">
      <div className="certificate-modal">
        <div className="certificate-header">
          <h2>Create Certificate</h2>
          <div className="danger close" onClick={onClose}>&times;</div>
        </div>
        
        <form onSubmit={handleSubmit} className="certificate-form">
          <div className="form-row">
            <div className="form-group">
              <label>Student Name</label>
              <input type="text" value={student.studentName || ''} readOnly className="form-control" />
            </div>

            <div className="form-group">
              <label>Roll Number</label>
              <input type="text" value={student.rollNumber || ''} readOnly className="form-control" />
            </div>
          </div>

          <div className="form-group">
            <label>Upload Certificate *</label>
            <input type="file" name="certificate" accept="image/*,.pdf" onChange={handleFileChange} required className="form-control" />
            {previews.certificate && (
              <div className="preview-box">
                {formData.certificate?.type.startsWith('image/') ? (
                  <img src={previews.certificate} alt="Certificate Preview" className="preview-image" />
                ) : (
                  <div className="pdf-preview">PDF File Selected: {formData.certificate?.name}</div>
                )}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Upload Marksheet *</label>
            <input type="file" name="marksheet" accept="image/*,.pdf" onChange={handleFileChange} required className="form-control" />
            {previews.marksheet && (
              <div className="preview-box">
                {formData.marksheet?.type.startsWith('image/') ? (
                  <img src={previews.marksheet} alt="Marksheet Preview" className="preview-image" />
                ) : (
                  <div className="pdf-preview">PDF File Selected: {formData.marksheet?.name}</div>
                )}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-danger" onClick={handleReset}>Reset Form</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCertificate;
