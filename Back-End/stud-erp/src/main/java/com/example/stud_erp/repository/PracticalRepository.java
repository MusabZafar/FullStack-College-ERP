package com.example.stud_erp.repository;

import com.example.stud_erp.entity.Practical;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PracticalRepository extends JpaRepository<Practical, Long> {}
