package com.example.stud_erp.controller;

import com.example.stud_erp.entity.Notification;
import com.example.stud_erp.payload.NotificationDTO;
import com.example.stud_erp.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    // API for sending notifications (already added)
    @PostMapping("/send")
    public ResponseEntity<Notification> sendNotification(@RequestBody NotificationDTO notificationDTO) {
        Notification notification = notificationService.sendNotification(notificationDTO);
        return ResponseEntity.ok(notification);
    }

    // API for students to fetch their notifications
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Notification>> getNotificationsForStudent(@PathVariable Long studentId) {
        List<Notification> notifications = notificationService.getNotificationsForStudent(studentId);
        return ResponseEntity.ok(notifications);
    }

    // API for professors to fetch their notifications
    @GetMapping("/professor/{professorId}")
    public ResponseEntity<List<Notification>> getNotificationsForProfessor(@PathVariable Long professorId) {
        List<Notification> notifications = notificationService.getNotificationsForProfessor(professorId);
        return ResponseEntity.ok(notifications);
    }
}
