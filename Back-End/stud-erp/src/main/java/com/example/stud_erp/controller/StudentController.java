package com.example.stud_erp.controller;

import com.example.stud_erp.entity.Student;
import com.example.stud_erp.exception.CustomException;
import com.example.stud_erp.exception.OTPExpiredException;
import com.example.stud_erp.payload.ForgotPasswordRequest;
import com.example.stud_erp.payload.LoginRequest;
import com.example.stud_erp.payload.ResetPasswordRequest;
import com.example.stud_erp.payload.StudentDTO;
import com.example.stud_erp.repository.StudentRepository;
import com.example.stud_erp.service.ImageService;
import com.example.stud_erp.service.StudentService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;


    @Autowired
    private StudentService studentService;

    @Autowired
    private ImageService imageService;

    @Autowired
    private ImageService ImageService;

    @PostMapping("/add-student")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile multipartFile,
                                         @RequestParam("studentId") String studentId,
                                         @RequestParam("username") String username,
                                         @RequestParam("password") String password,
                                         @RequestParam("email") String email,
                                         @RequestParam("name") String name,
                                         @RequestParam("fatherName") String fatherName,
                                         @RequestParam("lastName") String lastName,
                                         @RequestParam("age") int age,
                                         @RequestParam("dob") LocalDate dob,
                                         @RequestParam("caste") String caste,
                                         @RequestParam("category") String category,
                                         @RequestParam("major") String major,
                                         @RequestParam("roll-no") Long rollNo,
                                         @RequestParam("year") int year,
                                         @RequestParam("phone-number") String number) {
        try {
            // Combined existence checks into a single method call
            boolean exists = studentService.existsByUniqueFields(studentId, username, email, rollNo);
            if (exists) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("A student with the same ID, Roll Number, Username, or Email already exists.");
            }

            // Create the Student object
            Student student = new Student();
            student.setStudentId(studentId);
            student.setUsername(username);
            student.setPassword(password);
            student.setEmail(email);
            student.setStudName(name);
            student.setStudFatherName(fatherName);
            student.setStudLastName(lastName);
            student.setStudentAge(age);
            student.setStudentDob(dob);
            student.setMajor(major);
            student.setStudCaste(caste);
            student.setStudCategory(category);
            student.setStudRollNo(rollNo);
            student.setStudPhoneNumber(number);
            student.setYear(year);

            // Handle the image upload and save the student
            String imageUrl = imageService.uploadStudentData(multipartFile, student);
            student.setImageUrl(imageUrl);

            // Save the student object after uploading the image
            studentService.addStudent(student);

            return ResponseEntity.ok("Student data successfully uploaded");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading student data");
        }
    }


    @GetMapping
    public List<StudentDTO> getAllStudents() {
        return studentService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable String id) {
        Optional<Student> student = studentService.getStudentById(id);
        return student.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student updatedStudent) {
        try {
            Student student = studentService.updateStudent(id, updatedStudent);
            return ResponseEntity.ok(student);
        } catch (CustomException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest , HttpServletResponse response) {
        try {
            Student authenticatedUser = studentService.authenticateUser(loginRequest);

//            if (authenticatedUser != null) {
//                Cookie cookie= new Cookie("userSession" ,authenticatedUser.getId().toString());
//                cookie.setHttpOnly(true);
//                cookie.setPath("/");
//                response.addCookie(cookie);
//
//            }
            return ResponseEntity.ok(authenticatedUser);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed: " + ex.getMessage());
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        try {
            studentService.sendForgotPasswordEmail(request.getEmail());
            return ResponseEntity.ok("OTP sent to your email successfully");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + ex.getMessage());
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOTP(@RequestParam String email, @RequestParam String otp) {
        try {
            studentService.verifyOTP(email, otp);
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
            studentService.resetPassword(request);
            return ResponseEntity.ok("Password reset successfully");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + ex.getMessage());
        }
    }
}