package com.project_mgmt.pms.service;

import com.project_mgmt.pms.data.Complain;
import com.project_mgmt.pms.data.Employee;
import com.project_mgmt.pms.data.Meeting;
import com.project_mgmt.pms.dto.EmployeeSearch;
import com.project_mgmt.pms.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.*;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private DesignerRepository designerRepository;
    @Autowired
    private ArchitectureRepository architectureManager;
    @Autowired
    private DesignManagerRepository designManagerRepository;
    @Autowired
    private ArchitectureRepository architectureRepository;
    @Autowired
    private CivilEngineerRepository civilEngineerRepository;
    @Autowired
    private PropertyExecutiveRepository propertyExecutiveRepository;
    @Autowired
    private PropertyOfficerRepository propertyOfficerRepository;
    @Autowired
    private PropertyManagerRepository propertyManagerRepository;
    @Autowired
    private ComplainRepository complainRepository;
    @Autowired
    private MeetingRepository meetingRepository;
    @Autowired
    private ProjectManagerRepository projectManagerRepository;

   //log in
   public Map<String, String> login(String email, String password, String jobRole) {
       Optional<Employee> optionalEmployee =
               employeeRepository.findByEmailAndPassword(email, password);

       if (optionalEmployee.isEmpty()) {
           throw new IllegalArgumentException("Invalid credentials.");
       }

       Employee employee = optionalEmployee.get();
       String empId = employee.getEmpId();
       String firstName = employee.getFirstName();
       String lastName = employee.getLastName();

       boolean existsInRole = switch (jobRole.toLowerCase()) {
           case "designer" -> designerRepository.existsById(empId);
           case "architecture" -> architectureRepository.existsById(empId);
           case "design_manager" -> designManagerRepository.existsById(empId);
           case "architecture_manager" -> architectureManager.existsById(empId);
           case "civil_engineer" -> civilEngineerRepository.existsById(empId);
           case "property_officer" -> propertyOfficerRepository.existsById(empId);
           case "property_manager" -> propertyManagerRepository.existsById(empId);
           case "property_executive" -> propertyExecutiveRepository.existsById(empId);
           case "project_manager" -> projectManagerRepository.existsById(empId);
           default -> false;
       };

       if (!existsInRole) {
           throw new IllegalArgumentException("You do not belong to this job role.");
       }

       Map<String, String> result = new HashMap<>();
       result.put("empId", empId);
       result.put("firstName", firstName);
       result.put("lastName", lastName);
       return result;
   }
    //create a complain
    public Complain makeComplains(String title, String message, String status,
                                  Employee complainer, Employee receiver) {
        Complain complain = new Complain();
        complain.setTitle(title);
        complain.setComplainMessage(message);
        complain.setComplainStatus(status);
        complain.setCreatedAt(new Date());
        complain.setComplainer(complainer);
        complain.setReceiver(receiver);
        return complainRepository.save(complain);
    }

   //view complains
    public List<Complain> viewComplains(String complainer, String receiver) {
        return complainRepository.findByComplainerEmpIdOrReceiverEmpId(complainer, receiver);
    }



    //change the pass
    public void changePassword(String empId, String newPassword) {
        Employee employee = employeeRepository.findById(empId)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found"));
        employee.setPassword(newPassword);
        employeeRepository.save(employee);
    }

    //update profile pic
    public void updateProfilePicture(String empId, byte[] newPicture) {
        Employee employee = employeeRepository.findById(empId)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found"));
        employee.setProfilePicture(newPicture);
        employeeRepository.save(employee);
    }


    public List<EmployeeSearch> getAllArchitectureEmployeesSummary() {
        List<String> empIds = architectureRepository.findAllEmployeeIds();
        return getEmployeeSummariesByIds(empIds);
    }

    public List<EmployeeSearch> getAllDesignerEmployeesSummary() {
        List<String> empIds = designerRepository.findAllEmployeeIds();
        return getEmployeeSummariesByIds(empIds);
    }
    private List<EmployeeSearch> getEmployeeSummariesByIds(List<String> empIds) {
        List<Employee> employees = employeeRepository.findAllById(empIds);
        return employees.stream()
                .map(e -> new EmployeeSearch(e.getEmpId(), e.getFirstName(), e.getLastName()))
                .collect(Collectors.toList());
    }
}
