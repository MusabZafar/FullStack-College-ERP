package com.example.stud_erp.service;

import com.example.stud_erp.entity.Professor;
import com.example.stud_erp.entity.Professor;
import com.example.stud_erp.exception.OTPExpiredException;
import com.example.stud_erp.payload.LoginRequest;
import com.example.stud_erp.payload.ResetPasswordRequest;
import com.example.stud_erp.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private EmailService emailService;

    public Professor saveProfessor(Professor professor) {
        return professorRepository.save(professor);
    }

    public List<Professor> getAllProfessors() {
        return professorRepository.findAll();
    }

    public Professor getProfessorById(String id) {
        return professorRepository.findByProfessorId(id);
    }


    public void deleteProfessor(Long id) {
        professorRepository.deleteById(id);
    }

    public Professor authenticateUser(LoginRequest loginRequest) {
        Professor user = professorRepository.findByUsername(loginRequest.getUsername());
        if (user == null || !loginRequest.getPassword().equals(user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }
        return user;
    }


    public void sendForgotPasswordEmail(String email) {
        Professor user = professorRepository.findByEmail(email);
        if (user == null) {
            throw new OTPExpiredException("User with email " + email + " not found");
        }

        String otp = generateOTP();
        user.setOtp(otp);
        professorRepository.save(user);

        emailService.sendOtpEmail(user.getEmail(), otp);
    }

    private String generateOTP() {
        // Generate a random 6-digit OTP
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    public void verifyOTP(String email, String otp) {
        Professor user = professorRepository.findByEmail(email);
        if (user == null) {
            throw new OTPExpiredException("User with email " + email + " not found");
        }

        if (!user.getOtp().equals(otp)) {
            throw new OTPExpiredException("Invalid OTP");
        }
    }

    public void resetPassword(ResetPasswordRequest request) {
        Professor user = professorRepository.findByEmail(request.getEmail());
        if (user == null) {
            throw new OTPExpiredException("User with email " + request.getEmail() + " not found");
        }

        // Set the new password (not encrypted)
        user.setPassword(request.getNewPassword());
        professorRepository.save(user);
    }
}
