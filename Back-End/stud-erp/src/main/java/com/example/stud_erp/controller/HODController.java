package com.example.stud_erp.controller;

import com.example.stud_erp.entity.HOD;
import com.example.stud_erp.exception.OTPExpiredException;
import com.example.stud_erp.payload.ForgotPasswordRequest;
import com.example.stud_erp.payload.LoginRequest;
import com.example.stud_erp.payload.ResetPasswordRequest;
import com.example.stud_erp.service.HODService;
import com.example.stud_erp.service.ImageService;
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
@RequestMapping("/api/hods")
public class HODController {

    @Autowired
    private HODService hodService;

    @Autowired
    private ImageService imageService;

//    @PostMapping("/add-hod")
//    public ResponseEntity<HOD> createHOD(@RequestBody HOD hod) {
//        HOD savedHOD = hodService.saveHOD(hod);
//        return new ResponseEntity<>(savedHOD, HttpStatus.CREATED);
//    }

    @PostMapping("/add-hod")
    public ResponseEntity<String> createHOD(@RequestParam("file") MultipartFile multipartFile,
                                            @RequestParam("name") String name,
                                            @RequestParam("department") String department,
                                            @RequestParam("username") String username,
                                            @RequestParam("password") String password,
                                            @RequestParam("email") String email,
                                            @RequestParam("phone") String phone) {
        try {
            HOD hod = new HOD();
            hod.setName(name);
            hod.setDepartment(department);
            hod.setUsername(username);
            hod.setPassword(password);
            hod.setEmail(email);
            hod.setPhone(phone);


            // Handle the image upload
            String imageUrl = imageService.uploadHodData(multipartFile, hod);
            hod.setImageUrl(imageUrl);

            // Set creation and update timestamps
            hod.setCreatedAt(LocalDateTime.now());
            hod.setUpdatedAt(LocalDateTime.now());

            HOD savedHOD = hodService.saveHOD(hod);
            return ResponseEntity.status(HttpStatus.CREATED).body("HOD data successfully uploaded");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("An HOD with the same Username or Email already exists.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading HOD data");
        }
    }

    @PutMapping("/update-hod/{id}")
    public ResponseEntity<String> updateHOD(@PathVariable Long id,
                                            @RequestParam(value = "file", required = false) MultipartFile multipartFile,
                                            @RequestParam("name") String name,
                                            @RequestParam("department") String department,
                                            @RequestParam("username") String username,
                                            @RequestParam("password") String password,
                                            @RequestParam("email") String email,
                                            @RequestParam("phone") String phone) {
        try {
            HOD existingHOD = hodService.getHODById(id);
            if (existingHOD == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("HOD not found with ID: " + id);
            }

            existingHOD.setName(name);
            existingHOD.setDepartment(department);
            existingHOD.setUsername(username);
            existingHOD.setPassword(password);
            existingHOD.setEmail(email);
            existingHOD.setPhone(phone);

            // Update image if provided
            if (multipartFile != null && !multipartFile.isEmpty()) {
                String imageUrl = imageService.uploadHodData(multipartFile, existingHOD);
                existingHOD.setImageUrl(imageUrl);
            }

            existingHOD.setUpdatedAt(LocalDateTime.now());
            HOD updatedHOD = hodService.saveHOD(existingHOD);

            return ResponseEntity.ok("HOD updated successfully.");
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("An HOD with the same Username or Email already exists.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating HOD data");
        }
    }


    @GetMapping("/get-hod")
    public ResponseEntity<List<HOD>> getAllHODs() {
        List<HOD> hods = hodService.getAllHODs();
        return ResponseEntity.ok(hods);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HOD> getHODById(@PathVariable Long id) {
        HOD hod = hodService.getHODById(id);
        return hod != null ? ResponseEntity.ok(hod) : ResponseEntity.notFound().build();
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHOD(@PathVariable Long id) {
        hodService.deleteHOD(id);
        return ResponseEntity.noContent().build();
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            HOD authenticatedUser = hodService.authenticateUser(loginRequest);
            return ResponseEntity.ok(authenticatedUser);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed: " + ex.getMessage());
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        try {
            hodService.sendForgotPasswordEmail(request.getEmail());
            return ResponseEntity.ok("OTP sent to your email successfully");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + ex.getMessage());
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOTP(@RequestParam String email, @RequestParam String otp) {
        try {
            hodService.verifyOTP(email, otp);
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
            hodService.resetPassword(request);
            return ResponseEntity.ok("Password reset successfully");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + ex.getMessage());
        }
    }
}
