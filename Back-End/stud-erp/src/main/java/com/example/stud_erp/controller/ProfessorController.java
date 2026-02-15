package com.example.stud_erp.controller;

import com.example.stud_erp.entity.Professor;
import com.example.stud_erp.exception.OTPExpiredException;
import com.example.stud_erp.payload.ForgotPasswordRequest;
import com.example.stud_erp.payload.LoginRequest;
import com.example.stud_erp.payload.ResetPasswordRequest;
import com.example.stud_erp.service.ImageService;
import com.example.stud_erp.service.ProfessorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/professors")
public class ProfessorController {

    @Autowired
    private ProfessorService professorService;

    @Autowired
    private ImageService imageService;

//    @PostMapping("/add-prof")
//    public ResponseEntity<Professor> createProfessor(@RequestBody Professor professor) {
//        Professor savedProfessor = professorService.saveProfessor(professor);
//        return ResponseEntity.ok(savedProfessor);
//    }

    @PostMapping("/add-prof")
    public ResponseEntity<String> createProfessor(@RequestParam("file") MultipartFile multipartFile,
                                                  @RequestParam("professorId") String professorId,
                                                  @RequestParam("name") String name,
                                                  @RequestParam("username") String username,
                                                  @RequestParam("password") String password,
                                                  @RequestParam("email") String email,
                                                  @RequestParam("subject") String subject,
                                                  @RequestParam("departmentName") String departmentName) {
        try {
            Professor professor = new Professor();
            professor.setProfessorId(professorId);
            professor.setName(name);
            professor.setUsername(username);
            professor.setPassword(password);
            professor.setEmail(email);
            professor.setSubject(subject);
            professor.setDepartmentName(departmentName);


            // Handle the image upload
            String imageUrl = imageService.uploadProfData(multipartFile, professor);
            professor.setImageUrl(imageUrl);

            Professor savedProfessor = professorService.saveProfessor(professor);
            return ResponseEntity.ok("Professor data successfully uploaded");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("A professor with the same ID, Username, or Email already exists.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading professor data");
        }
    }


    @GetMapping("/get-prof")
    public ResponseEntity<List<Professor>> getAllProfessors() {
        List<Professor> professors = professorService.getAllProfessors();
        return ResponseEntity.ok(professors);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Professor> getProfessorById(@PathVariable String id) {
        Professor professor = professorService.getProfessorById(id);
        return professor != null ? ResponseEntity.ok(professor) : ResponseEntity.notFound().build();
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfessor(@PathVariable Long id) {
        professorService.deleteProfessor(id);
        return ResponseEntity.noContent().build();
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Professor authenticatedUser = professorService.authenticateUser(loginRequest);
            return ResponseEntity.ok(authenticatedUser);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed: " + ex.getMessage());
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        try {
            professorService.sendForgotPasswordEmail(request.getEmail());
            return ResponseEntity.ok("OTP sent to your email successfully");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + ex.getMessage());
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOTP(@RequestParam String email, @RequestParam String otp) {
        try {
            professorService.verifyOTP(email, otp);
            return ResponseEntity.ok("OTP verified successfully");
        } catch (OTPExpiredException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("OTP verification failed: " + ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + ex.getMessage());
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        try {
            professorService.resetPassword(request);
            return ResponseEntity.ok("Password reset successfully");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + ex.getMessage());
        }
    }
}
