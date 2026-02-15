package com.example.stud_erp.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalTime;
import java.util.List;

@Data
@Entity
@Table(name = "class_session")
public class ClassSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String lecturer;
    private String subject;
    private LocalTime time;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "classSession")
    @JsonManagedReference
    private List<Attendance> attendance;
}