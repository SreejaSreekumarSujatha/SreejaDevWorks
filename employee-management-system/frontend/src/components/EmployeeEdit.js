

import React, { useState, useEffect } from 'react';

const EmployeeEdit = ({ employeeId, onBack }) => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    salary: 0,
    department: { id: 1 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch(`http://localhost:8080/api/employees/${employeeId}`, {
      headers: {
        'Authorization': 'Basic ' + btoa('admin:adminpass')
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch employee: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Loaded employee data:', data);
        setEmployee(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load employee:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [employeeId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setEmployee(prev => ({
      ...prev,
      [name]: name === 'salary' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    
    // Log the data being sent
    console.log('Submitting employee data:', employee);
    
    try {
      const response = await fetch(`http://localhost:8080/api/employees/${employeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:adminpass')
        },
        body: JSON.stringify(employee)
      });

      // Log response details
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        // Try to get error details from response
        let errorMessage = `Update failed: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.text();
          console.error('Server error response:', errorData);
          if (errorData) {
            errorMessage += ` - ${errorData}`;
          }
        } catch (e) {
          console.error('Could not read error response:', e);
        }
        throw new Error(errorMessage);
      }

      const updated = await response.json();
      console.log('Successfully updated employee:', updated);
      alert('Employee updated successfully!');
      setEmployee(updated);
      
    } catch (err) {
      console.error('Error updating employee:', err);
      setError(err.message);
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) {
    return <div>Loading employee data...</div>;
  }

  if (error && !employee.name) {
    return (
      <div>
        <h2>Error</h2>
        <p>Failed to load employee: {error}</p>
        <button onClick={onBack}>Back</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Edit Employee (ID: {employeeId})</h2>
      {error && <div style={{backgroundColor: '#ffebee', 
          color: '#c62828', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '20px' }}>Error: {error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Name </label>
          <input
            type="text"
            name="name"
            value={employee.name || ''}
           onChange={handleChange}
            required
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
           
          />
         
        </div>
        
        <div style={{ marginBottom: '15px' }}>
         <label>Email</label>
          <input
             name="email" 
              type="email"
              value={employee.email || ''} 
              onChange={handleChange} 
              required 
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
            
          />

          
        </div>
        
       <div style={{ marginBottom: '15px' }}>

          <label>Phone</label>
          <input
            name="phone" 
              value={employee.phone || ''} 
              onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          
          />
          
        </div>
        
       <div style={{ marginBottom: '15px' }}>

             <label>Job Title</label>
          <input
             name="role" 
              value={employee.role || ''} 
              onChange={handleChange} 
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
           
          />
         
          
        </div>
       <div style={{ marginBottom: '15px' }}>

        <label>Salary</label>
          <input
            type="number"
            name="salary" 
              value={employee.salary || 0} 
              onChange={handleChange}
              min="0"
              step="0.01"
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
           
          />
    
        </div>
        
         <div style={{ marginBottom: '15px' }}>
          <label>Department </label>

             <select  style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
              value={employee.department?.id || 1}
              onChange={e =>
                setEmployee(prev => ({
                  ...prev,
                  department: { ...prev.department, id: parseInt(e.target.value) }
                }))
              }
              
            >
         <option value={1}>HR</option>
              <option value={2}>IT</option>
              <option value={3}>Finance</option>
            </select>
          
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <button type="submit" style={{
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              marginRight: '10px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}>Update Employee</button>
          <button type="button" onClick={onBack} style={{
              backgroundColor: '#6c757d',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
            Back
          </button>
        </div>
      </form>
      
      {/* Debug info - remove in production */}
      {/* <details style={{ marginTop: '20px', fontSize: '12px' }}>
        <summary>Debug Info</summary>
        <pre>{JSON.stringify(employee, null, 2)}</pre>
      </details> */}
    </div>
  );
};

export default EmployeeEdit;