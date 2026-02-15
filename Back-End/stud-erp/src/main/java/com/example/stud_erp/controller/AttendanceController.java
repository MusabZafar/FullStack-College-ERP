package com.example.stud_erp.controller;
import com.example.stud_erp.entity.Attendance;
import com.example.stud_erp.entity.ClassSession;
import com.example.stud_erp.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/save")
    public ClassSession saveAttendance(@RequestBody Map<String, Object> request) {
        String lecturer = (String) request.get("professor");  // Changed to "professor"
        String subject = (String) request.get("subject");
        LocalDate attendanceDate = LocalDate.parse((String) request.get("attendanceDate"));
        LocalTime time = LocalTime.parse((String) request.get("time"));

        // Check if students field is present
        Map<String, String> students = (Map<String, String>) request.get("students");

        if (students == null || students.isEmpty()) {
            throw new IllegalArgumentException("Students list is required.");
        }

        return attendanceService.saveAttendance(lecturer, subject, attendanceDate, time, students);
    }




    @GetMapping("/lecturer/subject")
    public ResponseEntity<Map<LocalDate, List<Attendance>>> getAttendance(
            @RequestParam String lecturer,
            @RequestParam String subject) {
        Map<LocalDate, List<Attendance>> records = attendanceService.getAttendanceByLecturerAndSubject(lecturer, subject);
        return ResponseEntity.ok(records);
    }





}
