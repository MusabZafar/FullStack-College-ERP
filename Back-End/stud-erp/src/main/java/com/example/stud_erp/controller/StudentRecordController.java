package com.example.stud_erp.controller;

import com.example.stud_erp.entity.*;
import com.example.stud_erp.repository.CourseRepository;
import com.example.stud_erp.repository.SemesterRepository;
import com.example.stud_erp.repository.StudentRecordRepository;
import com.example.stud_erp.repository.StudentRepository;
import com.example.stud_erp.service.StudentRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/student-records")
public class StudentRecordController {

    @Autowired
    private StudentRecordService studentRecordService;


    @PostMapping("/add")
    public ResponseEntity<StudentRecord> createStudentRecord(@RequestBody StudentRecord studentRecord) {
        StudentRecord savedRecord = studentRecordService.saveStudentRecord(studentRecord);
        return new ResponseEntity<>(savedRecord, HttpStatus.CREATED);
    }
    // Retrieve all StudentRecords
    @GetMapping("/all")
    public ResponseEntity<List<StudentRecord>> getAllStudentRecords() {
        List<StudentRecord> studentRecords = studentRecordService.getAllStudentRecords();
        return new ResponseEntity<>(studentRecords, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentRecord> getStudentRecordById(@PathVariable Long id) {
        Optional<StudentRecord> studentRecord = studentRecordService.getStudentRecordById(id);

        return studentRecord.map(record -> new ResponseEntity<>(record, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update an existing StudentRecord
    @PutMapping("/update/{id}")
    public ResponseEntity<StudentRecord> updateStudentRecord(@PathVariable Long id, @RequestBody StudentRecord updatedRecord) {
        Optional<StudentRecord> existingRecord = studentRecordService.getStudentRecordById(id);

        if (existingRecord.isPresent()) {
            StudentRecord record = existingRecord.get();
            // Update the fields of the record
            record.setSemester(updatedRecord.getSemester());
            record.setSemesterName(updatedRecord.getSemesterName());
            record.setCourse(updatedRecord.getCourse());
            record.setStudent(updatedRecord.getStudent());
            record.setSubjects(updatedRecord.getSubjects());
            record.setPracticals(updatedRecord.getPracticals());

            StudentRecord savedRecord = studentRecordService.saveStudentRecord(record);
            return new ResponseEntity<>(savedRecord, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a specific StudentRecord by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteStudentRecord(@PathVariable Long id) {
        Optional<StudentRecord> existingRecord = studentRecordService.getStudentRecordById(id);

        if (existingRecord.isPresent()) {
            studentRecordService.deleteStudentRecord(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
