package com.project_mgmt.pms.service;

import com.project_mgmt.pms.data.Project;
import com.project_mgmt.pms.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class ReportService {
    @Autowired
    private ProjectRepository projectRepository;
    private Project project;

    public void generateProjectReport(Long projectId){



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
