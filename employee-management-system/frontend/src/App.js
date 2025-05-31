import React, { useState, useEffect } from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeEdit from './components/EmployeeEdit';
import EmployeeCreate from './components/EmployeeCreate';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [employees, setEmployees] = useState([]);

  // Login component
  const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);

    const handleLogin = async () => {
      if (!username || !password) {
        setError('Please enter username and password');
        return;
      }

      setLoggingIn(true);
      setError('');

      try {
        const response = await fetch('http://localhost:8080/api/employees', {
          headers: {
            'Authorization': 'Basic ' + btoa(username + ':' + password)
          }
        });

        if (response.ok) {
          const role = username.toLowerCase() === 'admin' ? 'ADMIN' : 'HR';
          setCurrentUser({ username, role, auth: btoa(username + ':' + password) });
          setIsLoggedIn(true);
        } else {
          setError('Invalid username or password');
        }
      } catch (error) {
        setError('Login failed. Please try again.');
      } finally {
        setLoggingIn(false);
      }
    };

    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f5f5f5', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '2rem', 
          borderRadius: '8px', 
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
          width: '400px' 
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              backgroundColor: '#2563eb', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 1rem',
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              👤
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
              Employee Management
            </h1>
            <p style={{ color: '#6b7280', marginTop: '8px' }}>Please sign in to continue</p>
          </div>

          {error && (
            <div style={{ 
              backgroundColor: '#fef2f2', 
              border: '1px solid #fecaca', 
              borderRadius: '4px', 
              padding: '12px', 
              marginBottom: '16px' 
            }}>
              <p style={{ color: '#b91c1c', fontSize: '14px', margin: 0 }}>{error}</p>
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '8px 12px', 
                border: '1px solid #d1d5db', 
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
              placeholder="Enter username"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '8px 12px', 
                border: '1px solid #d1d5db', 
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
              placeholder="Enter password"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loggingIn}
            style={{ 
              width: '100%', 
              backgroundColor: loggingIn ? '#9ca3af' : '#2563eb', 
              color: 'white', 
              padding: '10px 16px', 
              borderRadius: '6px', 
              border: 'none',
              fontSize: '14px',
              fontWeight: '500',
              cursor: loggingIn ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {loggingIn ? (
              <>
                <div style={{ 
                  width: '16px', 
                  height: '16px', 
                  border: '2px solid white', 
                  borderTop: '2px solid transparent', 
                  borderRadius: '50%', 
                  animation: 'spin 1s linear infinite',
                  marginRight: '8px'
                }}></div>
                Signing in...
              </>
            ) : (
              <>🔒 Sign In</>
            )}
          </button>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <div style={{ backgroundColor: '#f9fafb', borderRadius: '4px', padding: '12px', fontSize: '14px' }}>
              <p style={{ fontWeight: '500', color: '#374151', margin: '0 0 8px 0' }}>Demo Credentials:</p>
              <p style={{ color: '#6b7280', margin: '4px 0' }}>Admin: admin / adminpass</p>
              <p style={{ color: '#6b7280', margin: '4px 0' }}>HR: hr / hrpass</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Permission functions
  const canEdit = () => {
    return currentUser && (currentUser.role === 'ADMIN' || currentUser.role === 'HR');
  };

  const canDelete = () => {
    return currentUser && currentUser.role === 'ADMIN';
  };

  const canCreate = () => {
    return currentUser && (currentUser.role === 'ADMIN' || currentUser.role === 'HR');
  };

  // Event handlers for your existing components
  const handleEdit = (id) => {
    if (!canEdit()) {
      alert('You do not have permission to edit employees');
      return;
    }
    setSelectedEmployeeId(id);
  };

  const handleBack = () => {
    setSelectedEmployeeId(null);
    setShowCreateForm(false);
  };

  const handleShowCreate = () => {
    if (!canCreate()) {
      alert('You do not have permission to create employees');
      return;
    }
    setShowCreateForm(true);
    setSelectedEmployeeId(null);
  };

  const handleEmployeeCreated = (newEmployee) => {
    setEmployees(prev => [...prev, newEmployee]);
    setShowCreateForm(false);
    // Refresh the employee list if needed
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSelectedEmployeeId(null);
    setShowCreateForm(false);
    setEmployees([]);
  };

  // Show login if not logged in
  if (!isLoggedIn) {
    return <LoginForm />;
  }

  // Main app after login - integrates your existing components
  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header with user info and logout */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px',
          backgroundColor: 'white',
          padding: '15px 20px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Employee Management System</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>
                Welcome, <strong>{currentUser.username}</strong> ({currentUser.role})
              </span>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>
                Permissions: 
                {canCreate() && ' Create'}
                {canEdit() && ' Edit'}
                {canDelete() && ' Delete'}
                {!canEdit() && !canDelete() && ' View Only'}
              </div>
            </div>
            <button 
              onClick={handleLogout}
              style={{ 
                backgroundColor: '#ef4444', 
                color: 'white', 
                padding: '8px 16px', 
                borderRadius: '6px',
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Add Employee button - only show when not editing or creating */}
        {!selectedEmployeeId && !showCreateForm && canCreate() && (
          <div style={{ marginBottom: '20px' }}>
            <button 
              onClick={handleShowCreate}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '12px 20px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              ➕ Add New Employee
            </button>
          </div>
        )}

        {/* Show Create Form */}
        {showCreateForm ? (
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <EmployeeCreate 
              onBack={handleBack} 
              onSuccess={handleEmployeeCreated}
            />
          </div>
        ) : selectedEmployeeId ? (
          /* Show Edit Form */
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <EmployeeEdit 
              employeeId={selectedEmployeeId} 
              onBack={handleBack} 
            />
          </div>
        ) : (
          /* Show Employee List */
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <EmployeeList 
              onEdit={handleEdit}
              canEdit={canEdit()}
              canDelete={canDelete()}
              currentUser={currentUser}
            />
          </div>
        )}

        {/* Role info footer */}
        <div style={{ 
          marginTop: '20px', 
          backgroundColor: 'white', 
          padding: '15px', 
          borderRadius: '8px', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <strong>Your Role: {currentUser.role}</strong><br/>
          {currentUser.role === 'ADMIN' && ' Full access: View, Create, Edit, Delete all employees'}
          {currentUser.role === 'HR' && 'Limited access: View, Create, Edit employees (Cannot delete)'}
        </div>
      </div>
    </div>
  );
};

export default App;