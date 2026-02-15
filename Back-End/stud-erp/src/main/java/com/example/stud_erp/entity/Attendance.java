package com.example.stud_erp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_name")
    private String studentName;

    @Column(name = "status")
    private String status;

    @Column(name = "attendance_date")
    private LocalDate attendanceDate;

    @ManyToOne
    @JoinColumn(name = "class_session_id")
    @JsonBackReference
    private ClassSession classSession;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
}
