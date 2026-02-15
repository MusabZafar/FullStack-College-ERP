package com.example.stud_erp.service;

import com.example.stud_erp.entity.*;
import com.example.stud_erp.payload.NotificationDTO;
import com.example.stud_erp.repository.NotificationRepository;
import com.example.stud_erp.repository.ProfessorRepository;
import com.example.stud_erp.repository.StudentRepository;
import com.example.stud_erp.repository.HODRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private HODRepository hodRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private StudentRepository studentRepository;

    public Notification sendNotification(NotificationDTO notificationDTO) {
        Notification notification = new Notification(notificationDTO);
        notification.setSentAt(LocalDateTime.now());

        switch (notificationDTO.getRecipientType()) {
            case "STUDENT":
                studentRepository.findById(notificationDTO.getRecipientId())
                        .ifPresent(notification::setStudent);
                break;
            case "PROFESSOR":
                professorRepository.findById(notificationDTO.getRecipientId())
                        .ifPresent(notification::setProfessor);
                break;
            case "ALL_STUDENTS":
                studentRepository.findAll().forEach(student -> {
                    Notification newNotification = new Notification(notificationDTO);
                    newNotification.setStudent(student);
                    notificationRepository.save(newNotification);
                });
                return null;
            case "ALL_PROFESSORS":
                professorRepository.findAll().forEach(professor -> {
                    Notification newNotification = new Notification(notificationDTO);
                    newNotification.setProfessor(professor);
                    notificationRepository.save(newNotification);
                });
                return null;
            case "ALL_STUDENTS_AND_PROFESSORS":
                // Notify all students
                studentRepository.findAll().forEach(student -> {
                    Notification newNotification = new Notification(notificationDTO);
                    newNotification.setStudent(student);
                    notificationRepository.save(newNotification);
                });

                // Notify all professors
                professorRepository.findAll().forEach(professor -> {
                    Notification newNotification = new Notification(notificationDTO);
                    newNotification.setProfessor(professor);
                    notificationRepository.save(newNotification);
                });
                return null;
        }

        return notificationRepository.save(notification);
    }

    public List<Notification> getNotificationsForStudent(Long studentId) {
        return notificationRepository.findByStudentId(studentId);
    }

    public List<Notification> getNotificationsForProfessor(Long professorId) {
        return notificationRepository.findByProfessorId(professorId);
    }
}
