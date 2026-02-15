package com.example.stud_erp.controller;

import com.example.stud_erp.entity.Subject;
import com.example.stud_erp.entity.Semester;
import com.example.stud_erp.payload.SubjectDTO;
import com.example.stud_erp.repository.SemesterRepository;
import com.example.stud_erp.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/subjects")
public class SubjectController {

    @Autowired
    private SubjectService subjectService;

    @Autowired
    private SemesterRepository semesterRepository;

    @PostMapping("/add")
    public ResponseEntity<Subject> createSubject(@RequestBody SubjectDTO dto) {
        if (dto.getSemester() == null) {
            return ResponseEntity.badRequest().body(null);
        }

        Long semesterId = dto.getSemester().getId();

        Semester semester = semesterRepository.findById(semesterId)
                .orElseThrow(() -> new RuntimeException("Semester not found with ID: " + semesterId));

        // Create and populate Subject entity
        Subject subject = new Subject();
        subject.setCode(dto.getCode());
        subject.setName(dto.getName());
        subject.setCredits(dto.getCredits());
        subject.setGrade(dto.getGrade());
        subject.setCt1(dto.getCt1());
        subject.setCt2(dto.getCt2());
        subject.setTheory(dto.getTheory());
        subject.setSemester(semester);

        // Save the Subject entity
        Subject savedSubject = subjectService.addSubject(subject);
        return ResponseEntity.ok().body(savedSubject);
    }

    @GetMapping
    public List<Subject> getAllSubjects() {
        return subjectService.getAllSubjects();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Subject> getSubjectById(@PathVariable Long id) {
        Optional<Subject> subject = subjectService.getSubjectById(id);
        return subject.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubject(@PathVariable Long id) {
        if (subjectService.getSubjectById(id).isPresent()) {
            subjectService.deleteSubject(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
