package com.example.stud_erp.entity;

import com.example.stud_erp.payload.NotificationDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String subject;
    private String message;

    private String sender;  // "HOD" or "Professor"

    private LocalDateTime sentAt;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = true)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "professor_id", nullable = true)
    private Professor professor;

    @Column(nullable = false)
    private String recipientType; // Values: "STUDENT", "PROFESSOR", "ALL_STUDENTS", "ALL_PROFESSORS", "ALL"

    private Boolean readStatus = false;

    // Constructor to map from NotificationDTO
    public Notification(NotificationDTO notificationDTO) {
        this.title = notificationDTO.getTitle();
        this.subject = notificationDTO.getSubject();
        this.message = notificationDTO.getMessage();
        this.sender = notificationDTO.getSender();
        this.recipientType = notificationDTO.getRecipientType(); // Set recipient type
        this.sentAt = LocalDateTime.now(); // Set sentAt as current time
    }
}
