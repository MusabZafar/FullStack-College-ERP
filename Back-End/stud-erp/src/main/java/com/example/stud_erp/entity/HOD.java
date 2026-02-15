package com.example.stud_erp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "hods", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
public class HOD {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 @Column(nullable = false)
 private String name;

 @Column(length = 255)
 private String imageUrl;

 @Column(nullable = false)
 private String department;

 @Column(unique = true, nullable = false)
 private String username;

 @Column(nullable = false)
 private String password;

 @Column(unique = true, nullable = false)
 private String email;

 @Column(nullable = false)
 private String phone;

 @ElementCollection
 @CollectionTable(name = "hod_subjects", joinColumns = @JoinColumn(name = "hod_id"))
 @Column(name = "subject")
 private List<String> subjects;

 @Column
 private String otp;

 @Column
 private LocalDateTime otpExpiry;

 @Column(nullable = false, updatable = false)
 private LocalDateTime createdAt;

 @Column
 private LocalDateTime updatedAt;

 @PrePersist
 protected void onCreate() {
  createdAt = LocalDateTime.now();
 }

 @PreUpdate
 protected void onUpdate() {
  updatedAt = LocalDateTime.now();
 }
}
