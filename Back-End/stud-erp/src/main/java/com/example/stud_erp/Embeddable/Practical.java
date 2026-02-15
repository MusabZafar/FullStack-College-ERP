package com.example.stud_erp.Embeddable;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Practical {
    private String name;
    private String grade;
    private int written;
    private int viva;
}
