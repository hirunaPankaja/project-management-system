package com.project_mgmt.pms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MeetingDTO {
    private int meetingId;
    private String meetingType;
    private List<String> participants;
    private Date meetingDate;
    private LocalTime meetingTime;
    private String venue;
    private String meetingDescription;
    private Date createdDate;
    private String createdBy;
}
