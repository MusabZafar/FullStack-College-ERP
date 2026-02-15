package com.example.stud_erp.controller;


import com.example.stud_erp.entity.Semester;
import com.example.stud_erp.payload.*;
import com.example.stud_erp.repository.CourseRepository;
import com.example.stud_erp.repository.SemesterRepository;
import com.example.stud_erp.repository.StudentRepository;
import com.example.stud_erp.service.PracticalService;
import com.example.stud_erp.service.SemesterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/semesters")
public class SemesterController {

    @Autowired
    private SemesterRepository semesterRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private SemesterService semesterService;

    @Autowired
    private PracticalService practicalService;


    @PostMapping("/add")
    public ResponseEntity<SemesterDTO> createSemester(@RequestBody SemesterDTO dto) {
        try {
            Semester semester = semesterService.createSemester(dto);

            // No need to handle subjects here since it's already done in the service

            // Convert to DTO for response
            SemesterDTO responseDTO = semesterService.convertToDTO(semester);
            return ResponseEntity.ok().body(responseDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



//    @GetMapping("/all")
//    public ResponseEntity<List<SemesterDTO>> getAllSemesters() {
//        try {
//            List<SemesterDTO> semesters = semesterService.findAll();
//            return ResponseEntity.ok().body(semesters);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }
//    }




    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSemester(@PathVariable Long id) {
        if (semesterRepository.existsById(id)) {
            semesterRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
