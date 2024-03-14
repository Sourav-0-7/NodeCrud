import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ Name: '', Mobile: '', Address: '', Date: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/user', newUser);
      setUsers([...users, response.data]);
      setNewUser({ Name: '', Mobile: '', Address: '', Date: '' });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ Name: user.Name, Mobile: user.Mobile, Address: user.Address, Date: user.Date });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/user/${editingUser._id}`, newUser);
      setUsers(users.map((user) => (user._id === editingUser._id ? response.data : user)));
      setEditingUser(null);
      setNewUser({ Name: '', Mobile: '', Address: '', Date: '' });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/user/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="app">
      <h1>User Management</h1>
      <div className="form-container">
        <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser}>
          <input
            type="text"
            name="Name"
            placeholder="Name"
            value={newUser.Name}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="Mobile"
            placeholder="Mobile"
            value={newUser.Mobile}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="Address"
            placeholder="Address"
            value={newUser.Address}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="Date"
            placeholder="Date"
            value={newUser.Date}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="btn">
            {editingUser ? 'Update User' : 'Create User'}
          </button>
        </form>
      </div>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user._id} className="user-item">
            <div className="user-details">
              <p>
                <strong>Name:</strong> {user.Name}
              </p>
              <p>
                <strong>Mobile:</strong> {user.Mobile}
              </p>
              <p>
                <strong>Address:</strong> {user.Address}
              </p>
              <p>
                <strong>Date:</strong> {new Date(user.Date).toLocaleDateString()}
              </p>
            </div>
            <div className="user-actions">
              <button onClick={() => handleEditUser(user)} className="btn btn-edit">
                Edit
              </button>
              <button onClick={() => handleDeleteUser(user._id)} className="btn btn-delete">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;