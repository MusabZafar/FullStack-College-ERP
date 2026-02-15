package com.example.stud_erp.payload;

import lombok.Data;

@Data
public class OtpVerificationRequest {
    private String email;
    private String otp;
}
