package com.example.stud_erp.exception;

public class OTPExpiredException  extends RuntimeException{
    public OTPExpiredException(String message) {
        super(message);
    }
}
