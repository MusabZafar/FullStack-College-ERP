package com.example.stud_erp.service;

import com.example.stud_erp.entity.Department;
import com.example.stud_erp.entity.HOD;
import com.example.stud_erp.entity.HOD;
import com.example.stud_erp.exception.OTPExpiredException;
import com.example.stud_erp.exception.ResourceNotFoundException;
import com.example.stud_erp.payload.LoginRequest;
import com.example.stud_erp.payload.ResetPasswordRequest;
import com.example.stud_erp.repository.HODRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class HODService {

    @Autowired
    private HODRepository hodRepository;

    @Autowired
    private EmailService emailService;

    public HOD saveHOD(HOD hod) {
        return hodRepository.save(hod);
    }



    public List<HOD> getAllHODs() {
        return hodRepository.findAll();
    }

    public HOD getHODById(Long id) {
        return hodRepository.findById(id).orElse(null);
    }

    public void deleteHOD(Long id) {
        hodRepository.deleteById(id);
    }

    public HOD updateHOD(Long id, HOD hodDetails) {
        HOD hod = hodRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("HOD not found for this id :: " + id));

        hod.setName(hodDetails.getName());
        hod.setDepartment(hodDetails.getDepartment());
        hod.setUsername(hodDetails.getUsername());
        hod.setPassword(hodDetails.getPassword());
        hod.setEmail(hodDetails.getEmail());
        hod.setPhone(hodDetails.getPhone());
        hod.setSubjects(hodDetails.getSubjects());
        hod.setUpdatedAt(LocalDateTime.now());

        if (hodDetails.getImageUrl() != null) {
            hod.setImageUrl(hodDetails.getImageUrl());
        }

        return hodRepository.save(hod);
    }


    public HOD authenticateUser(LoginRequest loginRequest) {
        HOD user = hodRepository.findByUsername(loginRequest.getUsername());
        if (user == null || !loginRequest.getPassword().equals(user.getPassword())) {
            throw new RuntimeException("Invalid username or password");
        }
        return user;
    }


    public void sendForgotPasswordEmail(String email) {
        HOD user = hodRepository.findByEmail(email).getHod();
        if (user == null) {
            throw new OTPExpiredException("User with email " + email + " not found");
        }

        String otp = generateOTP();
        user.setOtp(otp);
        hodRepository.save(user);

        emailService.sendOtpEmail(user.getEmail(), otp);
    }



    private String generateOTP() {
        // Generate a random 6-digit OTP
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    public void verifyOTP(String email, String otp) {
        HOD user = hodRepository.findByEmail(email).getHod();
        if (user == null) {
            throw new OTPExpiredException("User with email " + email + " not found");
        }

        if (!user.getOtp().equals(otp)) {
            throw new OTPExpiredException("Invalid OTP");
        }
    }

    public void resetPassword(ResetPasswordRequest request) {
        HOD hod = hodRepository.findByEmail(request.getEmail()).getHod();
        if (hod == null) {
            throw new OTPExpiredException("User with email " + request.getEmail() + " not found");
        }

        // Set the new password (not encrypted)
        hod.setPassword(request.getNewPassword());
        hodRepository.save(hod);
    }
}
