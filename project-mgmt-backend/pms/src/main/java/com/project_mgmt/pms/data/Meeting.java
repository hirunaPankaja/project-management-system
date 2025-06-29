package com.project_mgmt.pms.data;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.Date;

import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "meeting")
public class Meeting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int meetingId;

    private String meetingType;
    private String participants;
    private Date meetingDate;
    private LocalTime meetingTime;
    private String venue;
    private String meetingDescription;
    private Date createdDate;

    @ManyToOne
    @JoinColumn(name = "creator_id", referencedColumnName = "empId")
    private Employee createdBy;
}
