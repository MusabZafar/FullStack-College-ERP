package com.example.stud_erp.service;

import com.example.stud_erp.controller.EmailController;
import com.example.stud_erp.entity.Professor;
import com.example.stud_erp.entity.Student;
import com.example.stud_erp.repository.ProfessorRepository;
import com.example.stud_erp.repository.StudentRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    private static final Logger logger = LoggerFactory.getLogger(EmailController.class);



    public List<String> getAllStudentEmails() {
        List<Student> students = studentRepository.findAll();
        return students.stream().map(Student::getEmail).collect(Collectors.toList());

    }

    public List<String> getAllProfessorEmails() {
        List<Professor> professors = professorRepository.findAll();
        return professors.stream().map(Professor::getEmail).collect(Collectors.toList());
    }


    public List<String> getAllStudentAndProfessorEmails() {
        List<String> allEmails = new ArrayList<>();
        allEmails.addAll(getAllStudentEmails());
        allEmails.addAll(getAllProfessorEmails());
        return allEmails;
    }

    public void sendOtpEmail(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Your OTP Code");
        message.setText("Your OTP code is: " + otp);
        mailSender.send(message);
    }

    public void sendEmailWithAttachments(List<String> recipients, String subject, String body, File[] attachments) throws MessagingException {
        for (String to : recipients) {
            try {
                if (to == null || to.isEmpty()) {
                    logger.warn("Skipping invalid email address: {}", to);
                    continue;
                }

                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true);

                logger.debug("Sending email to: {}", to);
                helper.setTo(to);
                helper.setSubject(subject);
                helper.setText(body, true);

                if (attachments != null) {
                    for (File attachment : attachments) {
                        if (attachment.exists()) {
                            FileSystemResource res = new FileSystemResource(attachment);
                            helper.addAttachment(attachment.getName(), res);
                        }
                    }
                }

                mailSender.send(message);
            } catch (MessagingException e) {
                logger.error("Failed to send email to: {}", to, e);
            }
        }

    }



}
