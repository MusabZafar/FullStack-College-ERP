//package com.example.stud_erp.controller;
//
//import com.example.stud_erp.entity.Users;
//import com.example.stud_erp.exception.OTPExpiredException;
//import com.example.stud_erp.payload.*;
//import com.example.stud_erp.service.UserService;
//import jakarta.validation.Valid;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Optional;
//import java.util.logging.Logger;
//
//@RestController
//@RequestMapping("/api/users")
//public class UserController {
//
//    @Autowired
//    private UserService userService;
//
//    private static final Logger LOGGER = Logger.getLogger(UserController.class.getName());
//
//    @PostMapping("/register")
//    public ResponseEntity<?> registerUser(@Validated @RequestBody UserRegistrationRequest userRequest) {
//        try {
//            Users savedUser = userService.registerUser(userRequest);
//            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
//        } catch (Exception ex) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed: " + ex.getMessage());
//        }
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
//        try {
//            Users authenticatedUser = userService.authenticateUser(loginRequest);
//            return ResponseEntity.ok(authenticatedUser);
//        } catch (Exception ex) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed: " + ex.getMessage());
//        }
//    }
//
//    @PostMapping("/forgot-password")
//    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
//        try {
//            userService.sendForgotPasswordEmail(request.getEmail());
//            return ResponseEntity.ok("OTP sent to your email successfully");
//        } catch (Exception ex) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + ex.getMessage());
//        }
//    }
//
//    @PostMapping("/verify-otp")
//    public ResponseEntity<?> verifyOTP(@RequestParam String email, @RequestParam String otp) {
//        try {
//            userService.verifyOTP(email, otp);
//            return ResponseEntity.ok("OTP verified successfully");
//        } catch (OTPExpiredException ex) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("OTP verification failed: " + ex.getMessage());
//        } catch (Exception ex) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + ex.getMessage());
//        }
//    }
//
//    @PostMapping("/reset-password")
//    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
//        try {
//            userService.resetPassword(request);
//            return ResponseEntity.ok("Password reset successfully");
//        } catch (Exception ex) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + ex.getMessage());
//        }
//    }
//
//    @GetMapping("/all")
//    public ResponseEntity<List<Users>> getAllUsers() {
//        return ResponseEntity.ok(userService.getAllUsers());
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Users> getUserById(@PathVariable Long id) {
//        Optional<Users> user = userService.getUserById(id);
//        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//    }
//}
