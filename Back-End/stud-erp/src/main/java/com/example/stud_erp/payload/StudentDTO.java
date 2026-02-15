package com.example.stud_erp.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudentDTO {

    private Long id;
    private String studentId;
    private String major;
    private int year;
    private Long studRollNo;
    private String studName;
    private String username;
    private String email;
    private String StudPhoneNumber;
    private LocalDate studentDob;
    private String studFatherName;
    private String studLastName;
    private String studCategory;
    private String studCaste;
    private int studentAge;
    private String imageUrl;
    private List<SemesterDTO> semesters; // Semester performance
    private List<AttendanceDTO> attendance; // Attendance details

    public StudentDTO(Long id, String studName) {
    }



    public StudentDTO(Long id, String studentId, String username, String email, String major, int year, Long studRollNo, String studName, String studFatherName, String studLastName, String studPhoneNumber) {
    }
}

