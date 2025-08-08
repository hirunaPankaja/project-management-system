package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting,Integer> {

    List<Meeting> findByCreatedBy_EmpId(String empId);

    @Query("SELECT m FROM Meeting m WHERE m.participants LIKE %:empId%")
    List<Meeting> findMeetingsByParticipant(@Param("empId") String empId);
}
