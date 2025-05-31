package com.example.employee_management.service;

import com.example.employee_management.model.Employee;
import com.example.employee_management.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;


@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

//    public Optional<Employee> getEmployeeById(Long id) {
//        return employeeRepository.findById(id);
//    }

    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

//    public Employee updateEmployee(Long id, Employee updatedEmployee) {
//        return employeeRepository.findById(id).map(employee -> {
//            employee.setName(updatedEmployee.getName());
//            employee.setEmail(updatedEmployee.getEmail());
//            employee.setPhone(updatedEmployee.getPhone());
//            employee.setDepartment(updatedEmployee.getDepartment());
//            employee.setRole(updatedEmployee.getRole());
//            return employeeRepository.save(employee);
//        }).orElse(null);
//    }

    public Employee updateEmployee(Long id, Employee updated) {
        Employee existing = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        existing.setName(updated.getName());
        existing.setEmail(updated.getEmail());
        existing.setPhone(updated.getPhone());
        existing.setRole(updated.getRole());
        existing.setSalary(updated.getSalary());
        existing.setDepartment(updated.getDepartment()); // Ensure department exists

        return employeeRepository.save(existing);
    }


//    public void deleteEmployee(Long id) {
//        employeeRepository.deleteById(id);
//    }

    public boolean deleteEmployee(Long id) {
        Optional<Employee> employeeOpt = employeeRepository.findById(id);
        if (employeeOpt.isPresent()) {
            employeeRepository.deleteById(id);
            return true;  // deleted successfully
        } else {
            return false; // not found
        }
    }

    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
    }
}
