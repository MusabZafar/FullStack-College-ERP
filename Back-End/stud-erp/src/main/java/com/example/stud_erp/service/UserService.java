//package com.example.stud_erp.service;
//
//import com.example.stud_erp.entity.HOD;
//import com.example.stud_erp.entity.Role;
//import com.example.stud_erp.entity.Users;
//import com.example.stud_erp.exception.OTPExpiredException;
//import com.example.stud_erp.payload.LoginRequest;
//import com.example.stud_erp.payload.ResetPasswordRequest;
//import com.example.stud_erp.payload.UserRegistrationRequest;
//import com.example.stud_erp.repository.RoleRepository;
//import com.example.stud_erp.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.*;
//
//@Service
//public class UserService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private RoleRepository roleRepository;
//
//    @Autowired
//    private EmailService emailService;
//
//
//
//    // Comment out or remove BCryptPasswordEncoder
//    // private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//
////    public Users registerUser(UserRegistrationRequest userRequest) {
////        if (userRepository.findByUsername(userRequest.getUsername()) != null) {
////            throw new RuntimeException("Username is already taken");
////        }
////        if (userRepository.findByEmail(userRequest.getEmail()) != null) {
////            throw new RuntimeException("Email is already registered");
////        }
////
////        Role role = roleRepository.findByRole(userRequest.getRoleName());
////        if (role == null) {
////            throw new RuntimeException("Role not found");
////        }
////
////        Users user;
////        if (userRequest.getRoleName().equals("ROLE_HOD")) {
////            user = new HOD(); // Instance of HOD without additional details
////        } else {
////            user = new Users(); // Default Users instance
////        }
////
////        user.setUsername(userRequest.getUsername());
////        user.setEmail(userRequest.getEmail());
////        user.setPassword(userRequest.getPassword()); // Encrypt if needed
////        user.setRoles(Collections.singleton(role));
////
////        return userRepository.save(user);
////    }
//
//
//    public List<Users> getAllUsers() {
//        return userRepository.findAll();
//    }
//
//    public Users authenticateUser(LoginRequest loginRequest) {
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
//
//
//    public Optional<Users> getUserById(Long id) {
//        return userRepository.findById(id);
//    }
//}
