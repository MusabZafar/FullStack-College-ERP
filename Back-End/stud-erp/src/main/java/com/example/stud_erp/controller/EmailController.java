package com.example.stud_erp.controller;

import com.example.stud_erp.service.EmailService;
import jakarta.mail.MessagingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    private static final Logger logger = LoggerFactory.getLogger(EmailController.class);

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(
            @RequestParam String recipientType,
            @RequestParam(required = false) List<String> recipients,
            @RequestParam(required = false) List<String> selectedStudents,
            @RequestParam(required = false) List<String> selectedProfessors,
            @RequestParam String subject,
            @RequestParam String body,
            @RequestParam(value = "attachments", required = false) MultipartFile[] attachments) {
        try {
            List<String> finalRecipients;

            // Determine the recipients based on recipientType
            switch (recipientType) {
                case "all-students":
                    finalRecipients = emailService.getAllStudentEmails();
                    break;
                case "all-professors":
                    finalRecipients = emailService.getAllProfessorEmails();
                    break;
                case "all":
                    finalRecipients = emailService.getAllStudentAndProfessorEmails();
                    break;
                case "individual-student":
                case "individual-professor":
                    finalRecipients = recipients;
                    break;
                case "selected-students":
                    finalRecipients = selectedStudents;
                    break;
                case "selected-professors":
                    finalRecipients = selectedProfessors;
                    break;
                default:
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid recipient type specified");
            }

            File[] attachmentFiles = null;
            if (attachments != null && attachments.length > 0) {
                attachmentFiles = new File[attachments.length];
                for (int i = 0; i < attachments.length; i++) {
                    attachmentFiles[i] = convertMultipartFileToFile(attachments[i]);
                    logger.debug("Prepared attachment file: {}", attachmentFiles[i].getAbsolutePath());
                }
            }

            emailService.sendEmailWithAttachments(finalRecipients, subject, body, attachmentFiles);

            // Cleanup temporary files
            if (attachmentFiles != null) {
                for (File file : attachmentFiles) {
                    if (file != null && file.exists()) {
                        if (!file.delete()) {
                            logger.warn("Could not delete file: {}", file.getAbsolutePath());
                        }
                    }
                }
            }

            logger.info("Emails sent successfully");
            return ResponseEntity.ok("Emails sent successfully");
        } catch (MessagingException e) {
            logger.error("Messaging exception occurred: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Messaging error occurred while sending emails");
        } catch (IOException e) {
            logger.error("IO exception occurred: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File error occurred while preparing attachments");
        } catch (Exception e) {
            logger.error("General exception occurred: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred while sending emails");
        }
    }

    private File convertMultipartFileToFile(MultipartFile file) throws IOException {
        Path tempDir = Files.createTempDirectory("");
        Path tempFile = tempDir.resolve(file.getOriginalFilename());
        Files.copy(file.getInputStream(), tempFile, StandardCopyOption.REPLACE_EXISTING);
        return tempFile.toFile();
    }
}
