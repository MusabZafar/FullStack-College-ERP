package com.example.stud_erp.service;

import com.example.stud_erp.entity.Practical;
import com.example.stud_erp.entity.Semester;
import com.example.stud_erp.entity.StudentRecord;
import com.example.stud_erp.entity.Subject;
import com.example.stud_erp.repository.SemesterRepository;
import com.example.stud_erp.repository.StudentRecordRepository;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentRecordService {

    @Autowired
    private SemesterRepository semesterRepository;
    @Autowired
    private StudentRecordRepository studentRecordRepository;


    public StudentRecord saveStudentRecord(StudentRecord studentRecord) {
        return studentRecordRepository.save(studentRecord);
    }

    // Retrieve all StudentRecords
    public List<StudentRecord> getAllStudentRecords() {
        return studentRecordRepository.findAll();
    }

    // Retrieve a specific StudentRecord by ID
    public Optional<StudentRecord> getStudentRecordById(Long id) {
        return studentRecordRepository.findById(id);
    }

    // Delete a StudentRecord by ID
    public void deleteStudentRecord(Long id) {
        studentRecordRepository.deleteById(id);
    }
}
