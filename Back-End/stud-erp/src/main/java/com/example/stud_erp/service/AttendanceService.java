package com.example.stud_erp.service;


import com.example.stud_erp.entity.Attendance;
import com.example.stud_erp.entity.ClassSession;
import com.example.stud_erp.entity.Student;
import com.example.stud_erp.repository.AttendanceRepository;
import com.example.stud_erp.repository.ClassRepository;
import com.example.stud_erp.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AttendanceService {

    @Autowired
    private ClassRepository classSessionRepository;

    @Autowired
    private AttendanceRepository attendanceRecordRepository;

    @Autowired
    private StudentRepository studentRepository;

    public ClassSession saveAttendance(String lecturer, String subject, LocalDate attendanceDate, LocalTime time, Map<String, String> students) {
        ClassSession classSession = new ClassSession();
        classSession.setLecturer(lecturer);
        classSession.setSubject(subject);
        classSession.setTime(time);

        List<Attendance> attendanceRecords = new ArrayList<>();

        for (Map.Entry<String, String> entry : students.entrySet()) {
            Attendance record = new Attendance();
            record.setStudentName(entry.getKey());
            record.setStatus(entry.getValue());
            record.setAttendanceDate(attendanceDate);
            record.setClassSession(classSession);

            // Find the student by name or another unique identifier
            Student student = studentRepository.findByStudName(entry.getKey());
            if (student != null) {
                record.setStudent(student);  // Set the Student entity in the Attendance
            } else {
                throw new IllegalArgumentException("Student not found: " + entry.getKey());
            }

            attendanceRecords.add(record);
        }

        classSession.setAttendance(attendanceRecords);

        return classSessionRepository.save(classSession);
    }


    public Map<LocalDate, List<Attendance>> getAttendanceByLecturerAndSubject(String lecturer, String subject) {
        List<Attendance> records = attendanceRecordRepository.findByClassSessionLecturerAndClassSessionSubject(lecturer, subject);

        return records.stream().collect(Collectors.groupingBy(Attendance::getAttendanceDate));
    }

}
