package com.example.stud_erp.payload;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceDTO {
    private Long studentId;
    private Map<String, String> attendance;
    private Map<String, Integer> monthlyAttendance;
}
