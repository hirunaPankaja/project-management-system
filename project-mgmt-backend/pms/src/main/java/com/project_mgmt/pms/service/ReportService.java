package com.project_mgmt.pms.service;

import com.project_mgmt.pms.data.Project;
import com.project_mgmt.pms.data.Task;
import com.project_mgmt.pms.repository.ProjectRepository;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    @Autowired
    private ProjectRepository projectRepository;

    public ResponseEntity<byte[]> generateProjectReport(Long projectId) throws Exception {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        List<Task> tasks = project.getTasks();

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("projectName", project.getProjectName());
        parameters.put("projectDescription", project.getProjectDescription());
        parameters.put("projectBudget", project.getProjectBudget());
        parameters.put("projectTargetBudget", project.getProjectTargetBudget());
        parameters.put("projectSaving", project.getProjectSaving());
        parameters.put("projectStatus", project.getProjectStatus());
        parameters.put("projectStartDate", project.getProjectStartDate());
        parameters.put("projectEndDate", project.getProjectEndDate());

        parameters.put("logoPath", new ClassPathResource("static/images/logo.png").getFile().getAbsolutePath());

        // Pass tasks list as JRBeanCollectionDataSource
        JRBeanCollectionDataSource tasksDataSource = new JRBeanCollectionDataSource(tasks);
        parameters.put("tasksDataSource", tasksDataSource);

        InputStream reportStream = getClass().getResourceAsStream("/reports/project_report.jrxml");
        JasperReport jasperReport = JasperCompileManager.compileReport(reportStream);

        // Use the JRBeanCollectionDataSource as the main data source for tasks inside the report
        JasperPrint jasperPrint = JasperFillManager.fillReport(
                jasperReport,
                parameters,
                tasksDataSource
        );

        byte[] reportBytes = JasperExportManager.exportReportToPdf(jasperPrint);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=project_report.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(reportBytes);
    }

    public void generateTaskReport(){

    }
    public void generateProposalReport(){

    }
    public void generateOutletReport(){

    }
    public void generateDesignReport(){

    }
    public void generateProcurementReport(){

    }
    public void generateArchitectureReport(){

    }

}