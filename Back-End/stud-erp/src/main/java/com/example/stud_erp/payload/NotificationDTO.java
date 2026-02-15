package com.example.stud_erp.payload;

import com.example.stud_erp.entity.RecipientType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {
    private String title;
    private String subject;
    private String message;
    private String sender;
    private Long senderId;
    private String recipientType;
    private Long recipientId;
    private LocalDateTime sentAt;
}
