import React, { useState, useEffect } from 'react';
import './Roles.css';

/**
 * Roles settings component for managing user roles and permissions
 * @returns {JSX.Element} Roles settings component
 */
const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newRole, setNewRole] = useState({ name: '', description: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  // Predefined permissions groups
  const permissionGroups = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      permissions: [
        { id: 'dashboard_view', name: 'View Dashboard', description: 'Can view dashboard' },
        { id: 'dashboard_edit', name: 'Edit Dashboard', description: 'Can customize dashboard' }
      ]
    },
    {
      id: 'vehicles',
      name: 'Vehicles',
      permissions: [
        { id: 'vehicles_view', name: 'View Vehicles', description: 'Can view vehicle information' },
        { id: 'vehicles_edit', name: 'Edit Vehicles', description: 'Can edit vehicle information' },
        { id: 'vehicles_add', name: 'Add Vehicles', description: 'Can add new vehicles' },
        { id: 'vehicles_delete', name: 'Delete Vehicles', description: 'Can delete vehicles' }
      ]
    },
    {
      id: 'drivers',
      name: 'Drivers',
      permissions: [
        { id: 'drivers_view', name: 'View Drivers', description: 'Can view driver information' },
        { id: 'drivers_edit', name: 'Edit Drivers', description: 'Can edit driver information' },
        { id: 'drivers_add', name: 'Add Drivers', description: 'Can add new drivers' },
        { id: 'drivers_delete', name: 'Delete Drivers', description: 'Can delete drivers' }
      ]
    },
    {
      id: 'reports',
      name: 'Reports',
      permissions: [
        { id: 'reports_view', name: 'View Reports', description: 'Can view reports' },
        { id: 'reports_create', name: 'Create Reports', description: 'Can create new reports' },
        { id: 'reports_export', name: 'Export Reports', description: 'Can export reports' }
      ]
    },
    {
      id: 'settings',
      name: 'Settings',
      permissions: [
        { id: 'settings_view', name: 'View Settings', description: 'Can view settings' },
        { id: 'settings_edit', name: 'Edit Settings', description: 'Can edit settings' },
        { id: 'users_manage', name: 'Manage Users', description: 'Can manage user accounts' },
        { id: 'roles_manage', name: 'Manage Roles', description: 'Can manage roles and permissions' }
      ]
    }
  ];

  // Simulate fetching roles data
  useEffect(() => {
    // Mock data - in a real app, this would be an API call
    const mockRoles = [
      {
        id: 1,
        name: 'Administrator',
        description: 'Full system access',
        permissions: permissionGroups.flatMap(group => 
          group.permissions.map(perm => perm.id)
        )
      },
      {
        id: 2,
        name: 'Fleet Manager',
        description: 'Manages fleet operations',
        permissions: [
          'dashboard_view',
          'vehicles_view', 'vehicles_edit', 'vehicles_add',
          'drivers_view', 'drivers_edit', 'drivers_add',
          'reports_view', 'reports_create', 'reports_export',
          'settings_view'
        ]
      },
      {
        id: 3,
        name: 'Driver',
        description: 'Basic driver access',
        permissions: [
          'dashboard_view',
          'vehicles_view',
          'drivers_view'
        ]
      },
      {
        id: 4,
        name: 'Analyst',
        description: 'Data analysis access',
        permissions: [
          'dashboard_view',
          'vehicles_view',
          'drivers_view',
          'reports_view', 'reports_create', 'reports_export'
        ]
      }
    ];
    
    setTimeout(() => {
      setRoles(mockRoles);
      setLoading(false);
    }, 500);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRole(prev => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentRole(prev => ({ ...prev, [name]: value }));
  };

  const handleAddRole = () => {
    if (!newRole.name) return;
    
    const role = {
      id: roles.length + 1,
      ...newRole,
      permissions: []
    };
    
    setRoles([...roles, role]);
    setNewRole({ name: '', description: '' });
  };

  const handleEditRole = (role) => {
    setCurrentRole(role);
    setEditMode(true);
  };

  const handleUpdateRole = () => {
    if (!currentRole) return;
    
    const updatedRoles = roles.map(role => 
      role.id === currentRole.id ? currentRole : role
    );
    
    setRoles(updatedRoles);
    setEditMode(false);
    setCurrentRole(null);
  };

  const handleDeleteRole = (id) => {
    const updatedRoles = roles.filter(role => role.id !== id);
    setRoles(updatedRoles);
    if (selectedRole && selectedRole.id === id) {
      setSelectedRole(null);
    }
  };

  const handleSelectRole = (role) => {
    setSelectedRole(role);
  };

  const handlePermissionChange = (permissionId) => {
    if (!selectedRole) return;
    
    let updatedPermissions;
    if (selectedRole.permissions.includes(permissionId)) {
      updatedPermissions = selectedRole.permissions.filter(id => id !== permissionId);
    } else {
      updatedPermissions = [...selectedRole.permissions, permissionId];
    }
    
    const updatedRole = {
      ...selectedRole,
      permissions: updatedPermissions
    };
    
    setSelectedRole(updatedRole);
    
    // Update the role in the roles list
    const updatedRoles = roles.map(role => 
      role.id === selectedRole.id ? updatedRole : role
    );
    
    setRoles(updatedRoles);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setCurrentRole(null);
  };

  return (
    <div className="roles-container">
      <h1>Role Management</h1>
      
      <div className="roles-layout">
        <div className="roles-sidebar">
          <div className="roles-card">
            <h2>Add New Role</h2>
            <div className="role-form">
              <div className="form-group">
                <label htmlFor="name">Role Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newRole.name}
                  onChange={handleInputChange}
                  placeholder="Enter role name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={newRole.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                />
              </div>
              
              <button className="btn-add" onClick={handleAddRole}>Add Role</button>
            </div>
          </div>
          
          <div className="roles-card">
            <h2>Role List</h2>
            {loading ? (
              <p>Loading roles...</p>
            ) : (
              <ul className="roles-list">
                {roles.map(role => (
                  <li 
                    key={role.id} 
                    className={selectedRole && selectedRole.id === role.id ? 'active' : ''}
                    onClick={() => handleSelectRole(role)}
                  >
                    <div className="role-info">
                      <span className="role-name">{role.name}</span>
                      <span className="role-description">{role.description}</span>
                    </div>
                    <div className="role-actions">
                      <button 
                        className="btn-edit" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditRole(role);
                        }}
                        title="Edit role"
                      >
                        Edit
                      </button>
                      <button 
                        className="btn-delete" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRole(role.id);
                        }}
                        title="Delete role"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        <div className="roles-content">
          {editMode && currentRole ? (
            <div className="roles-card">
              <h2>Edit Role</h2>
              <div className="role-form">
                <div className="form-group">
                  <label htmlFor="edit-name">Role Name</label>
                  <input
                    type="text"
                    id="edit-name"
                    name="name"
                    value={currentRole.name}
                    onChange={handleEditInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="edit-description">Description</label>
                  <input
                    type="text"
                    id="edit-description"
                    name="description"
                    value={currentRole.description}
                    onChange={handleEditInputChange}
                  />
                </div>
                
                <div className="edit-actions">
                  <button className="btn-update" onClick={handleUpdateRole}>Update</button>
                  <button className="btn-cancel" onClick={handleCancelEdit}>Cancel</button>
                </div>
              </div>
            </div>
          ) : selectedRole ? (
            <div className="roles-card">
              <h2>Permissions for {selectedRole.name}</h2>
              <p className="role-description">{selectedRole.description}</p>
              
              <div className="permissions-container">
                {permissionGroups.map(group => (
                  <div key={group.id} className="permission-group">
                    <h3>{group.name}</h3>
                    <ul className="permissions-list">
                      {group.permissions.map(permission => (
                        <li key={permission.id}>
                          <label className="permission-label">
                            <input
                              type="checkbox"
                              checked={selectedRole.permissions.includes(permission.id)}
                              onChange={() => handlePermissionChange(permission.id)}
                            />
                            <div className="permission-info">
                              <span className="permission-name">{permission.name}</span>
                              <span className="permission-description">{permission.description}</span>
                            </div>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="roles-card">
              <h2>Role Permissions</h2>
              <p>Select a role from the list to view and edit its permissions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roles;
