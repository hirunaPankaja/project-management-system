package com.project_mgmt.pms.repository;

import com.project_mgmt.pms.data.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingRepository extends JpaRepository<Meeting,Integer> {
}
