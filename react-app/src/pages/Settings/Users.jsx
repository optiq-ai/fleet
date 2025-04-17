import React, { useState, useEffect } from 'react';
import './Users.css';

/**
 * Users settings component for managing user accounts
 * @returns {JSX.Element} Users settings component
 */
const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ username: '', email: '', role: 'user' });
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Simulate fetching users data
  useEffect(() => {
    // Mock data - in a real app, this would be an API call
    const mockUsers = [
      { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin', status: 'active' },
      { id: 2, username: 'manager', email: 'manager@example.com', role: 'manager', status: 'active' },
      { id: 3, username: 'driver1', email: 'driver1@example.com', role: 'driver', status: 'active' },
      { id: 4, username: 'analyst', email: 'analyst@example.com', role: 'analyst', status: 'inactive' },
      { id: 5, username: 'support', email: 'support@example.com', role: 'support', status: 'active' }
    ];
    
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 500);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({ ...prev, [name]: value }));
  };

  const handleAddUser = () => {
    if (!newUser.username || !newUser.email) return;
    
    const user = {
      id: users.length + 1,
      ...newUser,
      status: 'active'
    };
    
    setUsers([...users, user]);
    setNewUser({ username: '', email: '', role: 'user' });
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setEditMode(true);
  };

  const handleUpdateUser = () => {
    if (!currentUser) return;
    
    const updatedUsers = users.map(user => 
      user.id === currentUser.id ? currentUser : user
    );
    
    setUsers(updatedUsers);
    setEditMode(false);
    setCurrentUser(null);
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleToggleStatus = (id) => {
    const updatedUsers = users.map(user => {
      if (user.id === id) {
        return {
          ...user,
          status: user.status === 'active' ? 'inactive' : 'active'
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setCurrentUser(null);
  };

  return (
    <div className="users-container">
      <h1>User Management</h1>
      
      <div className="users-card">
        <h2>Add New User</h2>
        <div className="user-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={newUser.username}
              onChange={handleInputChange}
              placeholder="Enter username"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              placeholder="Enter email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="driver">Driver</option>
              <option value="analyst">Analyst</option>
              <option value="support">Support</option>
              <option value="user">Regular User</option>
            </select>
          </div>
          
          <button className="btn-add" onClick={handleAddUser}>Add User</button>
        </div>
      </div>
      
      {editMode && currentUser && (
        <div className="users-card">
          <h2>Edit User</h2>
          <div className="user-form">
            <div className="form-group">
              <label htmlFor="edit-username">Username</label>
              <input
                type="text"
                id="edit-username"
                name="username"
                value={currentUser.username}
                onChange={handleEditInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="edit-email">Email</label>
              <input
                type="email"
                id="edit-email"
                name="email"
                value={currentUser.email}
                onChange={handleEditInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="edit-role">Role</label>
              <select
                id="edit-role"
                name="role"
                value={currentUser.role}
                onChange={handleEditInputChange}
              >
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="driver">Driver</option>
                <option value="analyst">Analyst</option>
                <option value="support">Support</option>
                <option value="user">Regular User</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="edit-status">Status</label>
              <select
                id="edit-status"
                name="status"
                value={currentUser.status}
                onChange={handleEditInputChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div className="edit-actions">
              <button className="btn-update" onClick={handleUpdateUser}>Update</button>
              <button className="btn-cancel" onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="users-card">
        <h2>User List</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${user.status}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn-edit" 
                          onClick={() => handleEditUser(user)}
                          title="Edit user"
                        >
                          Edit
                        </button>
                        <button 
                          className="btn-toggle" 
                          onClick={() => handleToggleStatus(user.id)}
                          title={user.status === 'active' ? 'Deactivate user' : 'Activate user'}
                        >
                          {user.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button 
                          className="btn-delete" 
                          onClick={() => handleDeleteUser(user.id)}
                          title="Delete user"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
