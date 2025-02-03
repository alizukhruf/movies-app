import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import './UserForm.css';

const apiUrl = 'https://localhost:7267/api/User'; // Update the API URL
const apiKey = process.env.REACT_APP_API_KEY || 'your-api-key'; // Ensure the API key is set

const UserForm = () => {
  const [model, setModel] = useState({
    userID: 0,
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    ngDateOfBirth: {
      year: '',
      month: '',
      day: ''
    },
    phone: '',
    address: '',
    dateCreated: new Date().toISOString(),
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('ngDateOfBirth')) {
      const datePart = name.split('.')[1];
      setModel({ ...model, ngDateOfBirth: { ...model.ngDateOfBirth, [datePart]: value } });
    } else {
      setModel({ ...model, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log the payload and URL for debugging
      console.log('Submitting user:', model);
      console.log('API URL:', `${apiUrl}?apiKey=${apiKey}`);

      // Normalize the URL and send the request
      const response = await axios.post(
        `${apiUrl}?apiKey=${apiKey}`,
        model
      );

      // Log the success response
      console.log('User added:', response.data);

      setSubmitted(true);
    } catch (err) {
      // Log the error response for debugging
      console.error('API error:', err.response ? err.response.data : err.message);

      // Set the error message
      setError(err.response?.data?.message || 'Failed to add user. Please try again later.');
    }
  };

  const handleReset = () => {
    setModel({
      userID: 0,
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      ngDateOfBirth: {
        year: '',
        month: '',
        day: ''
      },
      phone: '',
      address: '',
      dateCreated: new Date().toISOString(),
    });
    setSubmitted(false);
    setError(null);
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <div hidden={submitted}>
            <h2 className="text-center mb-4">User Form</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  required
                  name="firstName"
                  value={model.firstName}
                  onChange={handleInputChange}
                />
                <div className="form-text text-danger" hidden={model.firstName !== ''}>
                  First Name is required
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  required
                  name="lastName"
                  value={model.lastName}
                  onChange={handleInputChange}
                />
                <div className="form-text text-danger" hidden={model.lastName !== ''}>
                  Last Name is required
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="dateOfBirth" className="form-label">Date Of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  name="dateOfBirth"
                  value={model.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="ngDateOfBirth.year" className="form-label">NG Date Of Birth Year</label>
                <input
                  type="number"
                  className="form-control"
                  name="ngDateOfBirth.year"
                  value={model.ngDateOfBirth.year}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="ngDateOfBirth.month" className="form-label">NG Date Of Birth Month</label>
                <input
                  type="number"
                  className="form-control"
                  name="ngDateOfBirth.month"
                  value={model.ngDateOfBirth.month}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="ngDateOfBirth.day" className="form-label">NG Date Of Birth Day</label>
                <input
                  type="number"
                  className="form-control"
                  name="ngDateOfBirth.day"
                  value={model.ngDateOfBirth.day}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  required
                  name="phone"
                  value={model.phone}
                  onChange={handleInputChange}
                />
                <div className="form-text text-danger" hidden={model.phone !== ''}>
                  Phone is required
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  required
                  name="address"
                  value={model.address}
                  onChange={handleInputChange}
                />
                <div className="form-text text-danger" hidden={model.address !== ''}>
                  Address is required
                </div>
              </div>

              <button type="submit" className="btn btn-success" disabled={!model.firstName || !model.lastName || !model.phone || !model.address}>
                Submit
              </button>
              <button type="button" className="btn btn-secondary ms-2" onClick={handleReset}>
                Reset Form
              </button>
            </form>
          </div>
          {submitted && (
            <div className="text-center">
              <h2>User added successfully!</h2>
              <button className="btn btn-primary" onClick={handleReset}>Add Another User</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserForm;