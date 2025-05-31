package com.example.employee_management.repository;

import com.example.employee_management.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository  extends  JpaRepository<Employee, Long>{


}
