package com.example.stud_erp.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubjectDTO {
    private Long id;
    private String code;
    private String name;
    private int credits;
    private String grade;
    private int ct1;
    private int ct2;
    private int theory;
    private SemesterDTO semester;
}
