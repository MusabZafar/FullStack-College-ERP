package com.example.stud_erp.entity;
import com.example.stud_erp.Embeddable.Practical;
import com.example.stud_erp.Embeddable.Subject;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "student_records")
public class StudentRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "semester_id")
    private Semester semester;

    private String semesterName;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ElementCollection
    @CollectionTable(name = "student_subjects", joinColumns = @JoinColumn(name = "student_record_id"))
    private List<Subject> subjects;

    @ElementCollection
    @CollectionTable(name = "student_practicals", joinColumns = @JoinColumn(name = "student_record_id"))
    private List<Practical> practicals;
}
