package com.example.stud_erp.repository;

import com.example.stud_erp.entity.HOD;
import com.example.stud_erp.entity.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HODRepository extends JpaRepository<HOD, Long> {
    Optional<HOD> findById(Long id);

    HOD findByUsername(String username);

    Professor findByEmail(String email);
}