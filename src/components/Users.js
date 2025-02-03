import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import './Users.css';

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const fetchUsers = async (setUsers, setError) => {
  try {
    console.log(`Fetching users from: ${apiUrl}api/user?apiKey=${apiKey}`);
    const response = await axios.get(`${apiUrl}api/user?apiKey=${apiKey}`);
    console.log('API response:', response.data);
    setUsers(response.data);
  } catch (err) {
    console.error('API fetch error:', err);
    setError('Failed to fetch results. Please try again later.');
  }
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers(setUsers, setError);
  }, []);

  return (
    <div className="container mt-5">
      <div className="card transparent-card">
        <div className="card-body">
          <h2 className="text-center mb-4">Users List</h2>
          {error && <p className="text-danger">{error}</p>}
          <table className="table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date Of Birth</th>
                <th>Phone</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.dateOfBirth}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;