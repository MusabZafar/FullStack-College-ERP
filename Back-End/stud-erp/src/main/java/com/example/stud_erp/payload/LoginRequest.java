package com.example.stud_erp.payload;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}
