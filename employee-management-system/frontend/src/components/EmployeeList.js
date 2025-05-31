import React, { useState, useEffect } from 'react';

const EmployeeList = ({ onEdit, canEdit, canDelete, currentUser }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/employees', {
        headers: {
          'Authorization': 'Basic ' + btoa('admin:adminpass') // You can pass this as prop if needed
        }
      });
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (employee) => {
    // Check if user can delete
    if (!canDelete) {
      alert('You do not have permission to delete employees');
      return;
    }

    // Confirm deletion
    if (!window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/employees/${employee.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Basic ' + btoa('admin:adminpass') // You can pass this as prop if needed
        }
      });

      if (response.ok) {
        // Remove employee from list
        setEmployees(prev => prev.filter(emp => emp.id !== employee.id));
        alert('Employee deleted successfully');
      } else {
        alert('Failed to delete employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Error deleting employee');
    }
  };

  if (loading) {
    return <div>Loading employees...</div>;
  }

  return (
    <div>
      <h2>Employee List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Phone</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Department</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Role</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Salary</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.phone || '-'}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.department?.name || 'Unassigned'}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{employee.role || '-'}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>${employee.salary?.toLocaleString() || '0'}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {/* Edit Button - Show for HR and ADMIN */}
                  {canEdit && (
                    <button
                      onClick={() => onEdit(employee.id)}
                      style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Edit
                    </button>
                  )}
                  
                  {/* Delete Button - Show only for ADMIN */}
                  {canDelete && (
                    <button
                      onClick={() => handleDelete(employee)}
                      style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Delete
                    </button>
                  )}
                  
                  {/* Show message if no permissions */}
                  {!canEdit && !canDelete && (
                    <span style={{ fontSize: '12px', color: '#666' }}>View Only</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;