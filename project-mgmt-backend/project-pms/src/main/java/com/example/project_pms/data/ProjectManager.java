package com.example.project_pms.data;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class ProjectManager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long managerId;

    private String fieldVisitLocation;
    private String fieldVisitDate;

    @OneToMany(mappedBy = "projectManager", cascade = CascadeType.ALL)
    private List<Project> projects = new ArrayList<>();
}
