package com.example.stud_erp.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseDTO {
    private Long id;
    private String code;
    private String name;
    private int credits;
    private ProfessorDTO professor;

    public CourseDTO(Long id, String code, String name, ProfessorDTO professorDTO) {
    }
}
