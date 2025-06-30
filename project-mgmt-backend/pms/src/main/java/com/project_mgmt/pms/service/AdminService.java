package com.project_mgmt.pms.service;

import com.project_mgmt.pms.data.*;
import com.project_mgmt.pms.data.ArchitectureManager;
import com.project_mgmt.pms.dto.EmployeeRegistrationRequest;
import com.project_mgmt.pms.dto.EmployeeSearch;
import com.project_mgmt.pms.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class AdminService {


    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private DesignerRepository designerRepository;
    @Autowired
    private com.project_mgmt.pms.repository.ArchitectureManager architectureManageRepo;
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
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private LawyerRepository lawyerRepository;


    public Employee registerEmployee(EmployeeRegistrationRequest request) {
        String nextEmpId = generateNextEmpId();
        String randomPassword = generateRandomPassword(10);
        Employee saved;

        switch (request.getJobRole().toLowerCase()) {
            case "admin" -> {
                Admin admin = populateEmployeeFields(new Admin(), nextEmpId, request, randomPassword);
                saved = adminRepository.save(admin);
            }
            case "lawyer" -> {
                Lawyer lawyer = populateEmployeeFields(new Lawyer(), nextEmpId, request, randomPassword);
                saved = lawyerRepository.save(lawyer);
            }
            case "designer" -> {
                Designer designer = populateEmployeeFields(new Designer(), nextEmpId, request, randomPassword);
                saved = designerRepository.save(designer);
            }
            case "architecture" -> {
                Architecture architecture = populateEmployeeFields(new Architecture(), nextEmpId, request, randomPassword);
                saved = architectureRepository.save(architecture);
            }
            case "project-manager" -> {
                ProjectManager projectManager = populateEmployeeFields(new ProjectManager(), nextEmpId, request, randomPassword);
                saved = projectManagerRepository.save(projectManager);
            }
            case "design-manager" -> {
                DesignManager designManager = populateEmployeeFields(new DesignManager(), nextEmpId, request, randomPassword);
                saved = designManagerRepository.save(designManager);
            }
            case "architecture-manager" -> {
                ArchitectureManager architectureManager = populateEmployeeFields(new ArchitectureManager(), nextEmpId, request, randomPassword);
                saved = architectureManageRepo.save(architectureManager);
            }
            case "civil-engineer" -> {
                CivilEngineer civilEngineer = populateEmployeeFields(new CivilEngineer(), nextEmpId, request, randomPassword);
                saved = civilEngineerRepository.save(civilEngineer);
            }
            case "property-officer" -> {
                PropertyOfficer propertyOfficer = populateEmployeeFields(new PropertyOfficer(), nextEmpId, request, randomPassword);
                saved = propertyOfficerRepository.save(propertyOfficer);
            }
            case "property-manager" -> {
                PropertyManager propertyManager = populateEmployeeFields(new PropertyManager(), nextEmpId, request, randomPassword);
                saved = propertyManagerRepository.save(propertyManager);
            }
            case "property-executive" -> {
                PropertyExecutive propertyExecutive = populateEmployeeFields(new PropertyExecutive(), nextEmpId, request, randomPassword);
                saved = propertyExecutiveRepository.save(propertyExecutive);
            }
            default -> throw new IllegalArgumentException("Invalid job role: " + request.getJobRole());
        }

        return saved;
    }


    private <T extends Employee> T populateEmployeeFields(
            T emp,
            String empId,
            EmployeeRegistrationRequest request,
            String password
    ) {
        emp.setEmpId(empId);
        emp.setFirstName(request.getFirstName());
        emp.setLastName(request.getLastName());
        emp.setEmail(request.getEmail());
        emp.setPassword(password);
        emp.setNic(request.getNic());
        return emp;
    }

    //gen empId
    private String generateNextEmpId() {
        Optional<Employee> lastEmployeeOpt =
                employeeRepository.findTopByOrderByEmpIdDesc();

        String lastEmpId = lastEmployeeOpt.map(Employee::getEmpId).orElse(null);

        int nextNumber = 1;

        if (lastEmpId != null && lastEmpId.startsWith("EMP")) {
            try {
                String numericPart = lastEmpId.substring(3);
                nextNumber = Integer.parseInt(numericPart) + 1;
            } catch (NumberFormatException e) {
                nextNumber = 1;
            }
        }

        return String.format("EMP%04d", nextNumber);
    }

    //Generate pass random
    private String generateRandomPassword(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";
        StringBuilder pwd = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            pwd.append(characters.charAt(random.nextInt(characters.length())));
        }
        return pwd.toString();
    }

    public Optional<Employee> serachEmployee (String empId){
        return employeeRepository.findById(empId);
    }

    public List<EmployeeSearch> getEmployees (EmployeeSearch employeeSearch){
        return employeeRepository.findAllEmployeeSummaries();
    }

    //not implement yet , need a dto class to pass update request
    public Employee editEmployee(String empId){
        return null;
    }

    public void deleteEmployee(String empId) {
        employeeRepository.deleteById(empId);
    }
}
