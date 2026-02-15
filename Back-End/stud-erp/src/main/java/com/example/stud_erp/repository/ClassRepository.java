package com.example.stud_erp.repository;

import com.example.stud_erp.entity.ClassSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassRepository  extends JpaRepository<ClassSession, Long> {
}