//package com.example.stud_erp.service;
//
//import com.example.stud_erp.exception.OTPExpiredException;
//import com.example.stud_erp.payload.LoginRequest;
//import com.example.stud_erp.payload.ResetPasswordRequest;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import java.util.Random;
//
//public class ForgotPasswordService {
//
//    @Autowired
//    private EmailService emailService
//
//        public Users authenticateUser(LoginRequest loginRequest) {
//        Users user = userRepository.findByUsername(loginRequest.getUsername());
//        if (user == null || !loginRequest.getPassword().equals(user.getPassword())) {
//            throw new RuntimeException("Invalid username or password");
//        }
//        return user;
//    }
//
//    public void sendForgotPasswordEmail(String email) {
//        Users user = userRepository.findByEmail(email);
//        if (user == null) {
//            throw new OTPExpiredException("User with email " + email + " not found");
//        }
//
//        String otp = generateOTP();
//        user.setOtp(otp);
//        userRepository.save(user);
//
//        emailService.sendOtpEmail(user.getEmail(), otp);
//    }
//
//    private String generateOTP() {
//        // Generate a random 6-digit OTP
//        Random random = new Random();
//        int otp = 100000 + random.nextInt(900000);
//        return String.valueOf(otp);
//    }
//
//    public void verifyOTP(String email, String otp) {
//        Users user = userRepository.findByEmail(email);
//        if (user == null) {
//            throw new OTPExpiredException("User with email " + email + " not found");
//        }
//
//        if (!user.getOtp().equals(otp)) {
//            throw new OTPExpiredException("Invalid OTP");
//        }
//    }
//
//    public void resetPassword(ResetPasswordRequest request) {
//        Users user = userRepository.findByEmail(request.getEmail());
//        if (user == null) {
//            throw new OTPExpiredException("User with email " + request.getEmail() + " not found");
//        }
//
//        // Set the new password (not encrypted)
//        user.setPassword(request.getNewPassword());
//        userRepository.save(user);
//    }
//
//}
