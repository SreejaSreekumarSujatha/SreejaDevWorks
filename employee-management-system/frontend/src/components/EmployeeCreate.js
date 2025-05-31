import React, { useState, useEffect } from 'react';

const EmployeeCreate = ({ onBack, onSuccess }) => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    salary: '',
    department: { id: '' }
  });
  
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load departments when component starts
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/departments', {
        headers: { 'Authorization': 'Basic ' + btoa('admin:adminpass') }
      });
      
      if (response.ok) {
        const data = await response.json();
        setDepartments(data);
        console.log('Departments loaded:', data);
      } else {
        setError('Failed to load departments');
      }
    } catch (error) {
      console.error('Error loading departments:', error);
      setError('Error loading departments: ' + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'departmentId') {
      setEmployee(prev => ({
        ...prev,
        department: { id: parseInt(value) }
      }));
    } else {
      setEmployee(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Submitting employee:', employee);
      
      const response = await fetch('http://localhost:8080/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:adminpass')
        },
        body: JSON.stringify({
          ...employee,
          salary: parseFloat(employee.salary) || 0
        })
      });

      if (response.ok) {
        const newEmployee = await response.json();
        console.log('Employee created:', newEmployee);
        alert('Employee created successfully!');
        
        if (onSuccess) {
          onSuccess(newEmployee);
        } else {
          onBack();
        }
      } else {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        setError('Failed to create employee: ' + response.status);
      }
      
    } catch (error) {
      console.error('Network error:', error);
      setError('Network error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Add New Employee</h2>
      
      {error && (
        <div style={{ 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '20px' 
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleInputChange}
            required
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
            placeholder="Enter full name"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleInputChange}
            required
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
            placeholder="Enter email address"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={employee.phone}
            onChange={handleInputChange}
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
            placeholder="Enter phone number"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Job Title</label>
          <input
            type="text"
            name="role"
            value={employee.role}
            onChange={handleInputChange}
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
            placeholder="Enter job title"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Salary</label>
          <input
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
            placeholder="Enter salary"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Department *</label>
          <select
            name="departmentId"
            value={employee.department.id}
            onChange={handleInputChange}
            required
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              marginRight: '10px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Creating...' : 'Create Employee'}
          </button>
          
          <button
            type="button"
            onClick={onBack}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Debug info */}
      {/* <details style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <summary>Debug Info (Click to expand)</summary>
        <pre>{JSON.stringify({ employee, departments }, null, 2)}</pre>
      </details> */}
    </div>
  );
};

export default EmployeeCreate;