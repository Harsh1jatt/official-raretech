import React, { useState, useEffect } from 'react';
import './css/Students.css';
import EditStudentModal from './EditStudentModal';
import CreateStudent from './CreateStudent';
import CreateCertificate from './CreateCertificate';
import { useStudents } from "../../../students/contexts/StudentContext";
import Certificates from './Certificates'
import axios from 'axios';

const Students = () => {
  // Use a local state for the students list so that we can sort and modify it.
  const { students, fetchStudents } = useStudents();
  const [localStudents, setLocalStudents] = useState([]);

  const instituteId = localStorage.getItem("instituteId");
  useEffect(() => {
    if (instituteId) {
      fetchStudents(instituteId);
    }
  }, [instituteId]);

  useEffect(() => {
    setLocalStudents(students);
  }, [students]);

  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCertificatesModal, setShowCertificatesModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreateCertificateModal, setShowCreateCertificateModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  // Search, sort, and selection states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('A-Z');
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Toggle dropdown
  const toggleDropdown = (studentId) => {
    setDropdownOpen(dropdownOpen === studentId ? null : studentId);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest('.dropdown-container')) {
      setDropdownOpen(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Handle edit student
  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
    setDropdownOpen(null);
  };
  const handleShowCertificates = (student) => {
    setSelectedStudent(student);
    setShowCertificatesModal(true);
    setDropdownOpen(null);
  };

  // Handle create certificate
  const handleCreateCertificate = (studentId) => {
    setLocalStudents((prev) =>
      prev.map((student) =>
        student._id === studentId ? { ...student, hasCertificate: true } : student
      )
    );
    setShowCreateCertificateModal(false);
  };

  // Handle new student creation
  const handleStudentCreate = (newStudent) => {
    fetchStudents(instituteId)
    setShowCreateModal(false);
  };

  // Handle delete student
  const handleDelete = async (studentId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        const response = await axios.post(
          `https://iems.onrender.com/institute/${studentId}/delete-student`,
          {}, // No body needed for a delete request
          {
            headers: {
              Authorization: `Bearer ${token}`, // Set Bearer token in headers
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.status === 200) {
          setLocalStudents((prev) => prev.filter((s) => s._id !== studentId));
          alert("Student deleted successfully.");
        }
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Failed to delete student.");
      }
    }
  };
  // Toggle individual student selection
  const toggleSelection = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  // Bulk delete selected students
  const deleteSelectedStudents = () => {
    console.log("Selected Students:", selectedStudents);
    const confirmDelete = window.confirm('Are you sure you want to delete selected students?');
    if (confirmDelete) {
      setLocalStudents((prev) => prev.filter((s) => !selectedStudents.includes(s._id)));
      setSelectedStudents([]);
    }
  };

  // Sorting logic for localStudents (use setLocalStudents, not setStudents)
  const sortStudents = (type) => {
    let sorted;
    if (type === 'A-Z') {
      sorted = [...localStudents].sort((a, b) => a.studentName.localeCompare(b.studentName));
    } else if (type === 'Z-A') {
      sorted = [...localStudents].sort((a, b) => b.studentName.localeCompare(a.studentName));
    } else if (type === 'Newest') {
      sorted = [...localStudents].sort((a, b) => new Date(b.dateOfBirth) - new Date(a.dateOfBirth));
    } else if (type === 'Oldest') {
      sorted = [...localStudents].sort((a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth));
    } else if (type === '1-100') {
      sorted = [...localStudents].sort((a, b) => a.rollNumber.localeCompare(b.rollNumber));
    } else if (type === '100-1') {
      sorted = [...localStudents].sort((a, b) => b.rollNumber.localeCompare(a.rollNumber));
    }
    setSortType(type);
    setLocalStudents(sorted);
  };

  // Search filtering logic on localStudents
  const filteredStudents = (localStudents || []).filter((student) =>
    student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.secCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.dateOfBirth.includes(searchQuery)
  );


  return (
    <div className="students-page">
      <div className="header">
        <h1>Students</h1>
        <div className="actions">
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button
            className="select-btn"
            onClick={() => {
              setSelectionMode(!selectionMode);
              setSelectedStudents([]);
            }}
          >
            {selectionMode ? 'Cancel Selection' : 'Select'}
          </button>
          <select
            className="sort-dropdown"
            value={sortType}
            onChange={(e) => sortStudents(e.target.value)}
          >
            <option value="A-Z">Sort A-Z</option>
            <option value="Z-A">Sort Z-A</option>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
            <option value="1-100">1-100</option>
            <option value="100-1">100-1</option>
          </select>
          {selectionMode && selectedStudents.length > 0 && (
            <button className="delete-btn" onClick={deleteSelectedStudents}>
              <i className="ri-delete-bin-line"></i> Delete
            </button>
          )}
          <button className="create-btn" onClick={() => setShowCreateModal(true)}>
            + Add Student
          </button>
        </div>
      </div>

      <div className="table-container scroll">
        {filteredStudents.length > 0 ? (
          <table className="student-table">
            <thead>
              <tr>
                {selectionMode && (
                  <th>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        setSelectedStudents(
                          e.target.checked ? filteredStudents.map((s) => s._id) : []
                        )
                      }
                      checked={
                        selectedStudents.length === filteredStudents.length &&
                        filteredStudents.length > 0
                      }
                    />
                  </th>
                )}
                <th>Sr.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Password</th>
                <th>Date of Birth</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (

                <tr key={student._id}>
                  {selectionMode && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student._id)}
                        onChange={() => toggleSelection(student._id)}
                      />
                    </td>
                  )}
                  <td>{index + 1}</td>
                  <td className="image-cell">
                    <img
                      src={student.profileImage}
                      alt="Student"
                      className="student-image"
                    />
                  </td>
                  <td>{student.studentName}</td>
                  <td>{student.rollNumber}</td>
                  <td><u>{student.secCode}</u></td>
                  <td>{new Date(student.dateOfBirth).toLocaleDateString('en-GB')}</td>
                  <td className="action-buttons">
                    <div className="dropdown-container">
                      <div
                        className="dropdown-trigger"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(student._id);
                        }}
                      >
                        <i className="ri-more-2-fill"></i>
                      </div>
                      {dropdownOpen === student._id && (
                        <ul className="dropdown-menu">
                          <li onClick={() => handleEditStudent(student)}>Edit</li>
                          {student.certificate ? (
                            <li onClick={() => handleShowCertificates(student)}>
                                View Certificate
                            </li>
                          ) : (
                            <li onClick={() => {
                              setSelectedStudent(student);
                              setShowCreateCertificateModal(true);
                              setDropdownOpen(null);
                            }}>
                              Create Certificate
                            </li>
                          )}

                          <li className="delete-option" onClick={() => handleDelete(student._id)}>
                            Delete
                          </li>
                        </ul>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-students">No students match your search.</p>
        )}
      </div>

      {/* Modals */}
      {showEditModal && selectedStudent && (
        <EditStudentModal
          student={selectedStudent}
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {showCertificatesModal && selectedStudent && (
        <Certificates
          student={selectedStudent}
          isOpen={showCertificatesModal}
          onClose={() => setShowCertificatesModal(false)}
        />
      )}

      {showCreateCertificateModal && selectedStudent && (
        <CreateCertificate
          student={selectedStudent}
          isOpen={showCreateCertificateModal}
          onClose={() => setShowCreateCertificateModal(false)}
          onCreateCertificate={handleCreateCertificate}
        />
      )}

      {showCreateModal && (
        <CreateStudent
          instituteId={instituteId}
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreateStudent={handleStudentCreate}
        />
      )}
    </div>
  );
};

export default Students;
