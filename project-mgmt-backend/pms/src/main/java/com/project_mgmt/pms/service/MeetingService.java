package com.project_mgmt.pms.service;

import com.project_mgmt.pms.data.Employee;
import com.project_mgmt.pms.data.Meeting;
import com.project_mgmt.pms.dto.MeetingDTO;
import com.project_mgmt.pms.repository.EmployeeRepository;
import com.project_mgmt.pms.repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class MeetingService {
    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmailService emailService;

    public Meeting createMeeting(MeetingDTO meetingDTO) {
        Optional<Employee> creatorOptional = employeeRepository.findById(meetingDTO.getCreatedBy());  //Here I can see error. 'findById(java.lang.String)' in 'org.springframework.data.repository.CrudRepository' cannot be applied to '(int)'. That is a error. fix it.

        if (!creatorOptional.isPresent()) {
            throw new RuntimeException("Creator not found with ID: " + meetingDTO.getCreatedBy());
        }

        Employee creator = creatorOptional.get();

        Meeting meeting = new Meeting();
        meeting.setMeetingType(meetingDTO.getMeetingType());
        meeting.setParticipants(meetingDTO.getParticipants().toString());
        meeting.setMeetingDate(meetingDTO.getMeetingDate());
        meeting.setMeetingTime(meetingDTO.getMeetingTime());
        meeting.setVenue(meetingDTO.getVenue());
        meeting.setMeetingDescription(meetingDTO.getMeetingDescription());
        meeting.setCreatedDate(new Date());
        meeting.setCreatedBy(creator);

        return meetingRepository.save(meeting);
    }

    public List<Meeting> getAllMeetings() {
        return meetingRepository.findAll();
    }

    public List<Meeting> getMeetingsCreatedBy(String empId) {
        return meetingRepository.findByCreatedBy_EmpId(empId);
    }

    public List<Meeting> getMeetingsAssignedTo(String empId) {
        return meetingRepository.findMeetingsByParticipant(empId);
    }
}

