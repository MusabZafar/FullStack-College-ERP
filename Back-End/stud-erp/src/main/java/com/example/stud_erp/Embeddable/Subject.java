package com.example.stud_erp.Embeddable;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Subject {
    private String code;
    private String name;
    private int credits;
    private String grade;
    private int ct1;
    private int ct2;
    private int theory;
}
