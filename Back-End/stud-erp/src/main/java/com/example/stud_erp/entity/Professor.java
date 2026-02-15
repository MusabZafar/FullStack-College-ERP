package com.example.stud_erp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "professors", uniqueConstraints = {
        @UniqueConstraint(columnNames = "professorId"),
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String professorId;

    @Column(nullable = false)
    private String name;

    @Column(length = 255)
    private String imageUrl;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private String departmentName;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    @Column
    private String otp;

    @Column
    private LocalDateTime otpExpiry;

    @ManyToOne
    private Department department;

    @ManyToOne
    @JoinColumn(name = "hod_id")
    private HOD hod;

    @ElementCollection
    @CollectionTable(name = "professor_subjects", joinColumns = @JoinColumn(name = "professor_id"))
    @Column(name = "subject")
    private List<String> subjects;
}
