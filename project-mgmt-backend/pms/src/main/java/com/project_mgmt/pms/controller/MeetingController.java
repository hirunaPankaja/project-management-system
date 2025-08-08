package com.project_mgmt.pms.controller;

import com.project_mgmt.pms.data.Meeting;
import com.project_mgmt.pms.dto.MeetingDTO;
import com.project_mgmt.pms.service.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meeting")
public class MeetingController {
    @Autowired
    private MeetingService meetingService;

    @PostMapping
    public Meeting createMeeting(@RequestBody MeetingDTO meetingDTO) {
        return meetingService.createMeeting(meetingDTO);
    }

    @GetMapping
    public List<Meeting> getAllMeetings() {
        return meetingService.getAllMeetings();
    }

    @GetMapping("/created-by/{empId}")
    public List<Meeting> getMeetingsCreatedBy(@PathVariable String empId) {
        return meetingService.getMeetingsCreatedBy(empId);
    }

    @GetMapping("/assigned-to/{empId}")
    public List<Meeting> getMeetingsAssignedTo(@PathVariable String empId) {
        return meetingService.getMeetingsAssignedTo(empId);
    }

    @GetMapping("/test")
    public String test() {
        return "API is working!";
    }
}
