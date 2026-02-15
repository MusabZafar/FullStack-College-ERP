package com.example.stud_erp.repository;

import com.example.stud_erp.entity.Student;
import com.example.stud_erp.payload.StudentDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {

    Student findByUsernameAndPassword(String username, String password);

    Student findByUsername(String username);

    Student findByEmail(String email);
    boolean existsByStudentId(String studentId);
    boolean existsByStudRollNo(Long rollNo);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
    Student findByStudName(String studName);

    @Query("SELECT s.username, s.email FROM Student s WHERE s.id = :id")
    Optional<StudentDTO> findStudentUsernameAndEmailById(Long id);

    Student findByStudentId(String id);
    boolean existsByStudentIdOrUsernameOrEmailOrStudRollNo(String studentId, String username, String email, Long rollNo);

}
