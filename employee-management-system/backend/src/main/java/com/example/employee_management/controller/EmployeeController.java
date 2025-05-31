package com.example.employee_management.controller;

import com.example.employee_management.model.Employee;
import com.example.employee_management.model.Department;
import com.example.employee_management.service.EmployeeService;
import com.example.employee_management.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees")
//@CrossOrigin(origins = "*") // Allow requests from your React app
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private DepartmentService departmentService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'HR')")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HR')")
    public Employee getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'HR')") // Allow both ADMIN and HR to create
    public ResponseEntity<Employee> createEmployee(@Valid @RequestBody Employee employee) {
        try {
            // Make sure department exists if provided
            if (employee.getDepartment() != null && employee.getDepartment().getId() != null) {
                Optional<Department> department = departmentService.getDepartmentById(employee.getDepartment().getId());
                if (department.isEmpty()) {
                    System.err.println("Department not found with id: " + employee.getDepartment().getId());
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
                }
                employee.setDepartment(department.get());
            }

            Employee savedEmployee = employeeService.createEmployee(employee);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedEmployee);

        } catch (RuntimeException e) {
            System.err.println("Error creating employee: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'HR')") // Allow both ADMIN and HR to update
    public Employee updateEmployee(@PathVariable Long id, @Valid @RequestBody Employee employee) {
        return employeeService.updateEmployee(id, employee);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Only ADMIN can delete
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        try {
            employeeService.deleteEmployee(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            System.err.println("Error deleting employee: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}