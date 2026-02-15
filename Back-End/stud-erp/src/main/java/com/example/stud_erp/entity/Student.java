package com.example.stud_erp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "students", uniqueConstraints = {
        @UniqueConstraint(columnNames = "studentId", name = "uk_students_student_id"),
        @UniqueConstraint(columnNames = "username", name = "uk_students_username"),
        @UniqueConstraint(columnNames = "email", name = "uk_students_email")
})
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 20)
    private String studentId;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false, length = 50)
    private String major;

    @Column(nullable = false)
    private int year;

    @Column(nullable = false, unique = true)
    private Long studRollNo;

    @Column(nullable = false, length = 50)
    private String studName;

    @Column(nullable = false, length = 50)
    private String studFatherName;

    @Column(nullable = false, length = 50)
    private String studLastName;

    @Column(nullable = false, length = 15)
    private String studPhoneNumber;

    @Column(nullable = false)
    private LocalDate studentDob;

    @Column(nullable = false, length = 30)
    private String studCategory;

    @Column(length = 30)
    private String studCaste;

    @Column(nullable = false)
    private int studentAge;

    @Column(length = 255)
    private String imageUrl;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "student")
    @JsonIgnore
    private Set<Semester> semesters;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "student")
    @JsonIgnore
    private Set<Attendance> attendance;

    @Column
    private String otp;

    @Column
    private LocalDateTime otpExpiry;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
