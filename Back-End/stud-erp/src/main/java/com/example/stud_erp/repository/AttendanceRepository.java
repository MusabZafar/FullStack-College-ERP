package com.example.stud_erp.repository;


import com.example.stud_erp.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    @Query("SELECT ar FROM Attendance ar WHERE ar.classSession.lecturer = :lecturer AND ar.classSession.subject = :subject ORDER BY ar.attendanceDate ASC")
    List<Attendance> findByClassSessionLecturerAndClassSessionSubject(String lecturer, String subject);

}