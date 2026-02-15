package com.example.stud_erp.repository;

import com.example.stud_erp.entity.Notification;
import com.example.stud_erp.entity.RecipientType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // Find notifications for a specific student
    @Query("SELECT n FROM Notification n WHERE n.student.id = :studentId ORDER BY n.sentAt DESC")
    List<Notification> findByStudentId(Long studentId);

    // Find notifications for a specific professor
    @Query("SELECT n FROM Notification n WHERE n.professor.id = :professorId ORDER BY n.sentAt DESC")
    List<Notification> findByProfessorId(Long professorId);
}

