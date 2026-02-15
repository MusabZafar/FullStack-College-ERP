package com.example.stud_erp.repository;


import com.example.stud_erp.entity.StudentRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRecordRepository extends JpaRepository<StudentRecord, Long> {
}