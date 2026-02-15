package com.example.stud_erp.payload;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PracticalDTO {

    @NotNull
    private Long id;
    @NotNull
    private String name;
    @NotNull
    private String grade;
    @NotNull
    private int written;
    @NotNull
    private int viva;
    @NotNull
    private Long semesterId;


    public PracticalDTO(Long id, String name, String grade, int written, int viva, Long semesterId) {
        this.id = id;
        this.name = name;
        this.grade = grade;
        this.written = written;
        this.viva = viva;
        this.semesterId = semesterId;
    }

}