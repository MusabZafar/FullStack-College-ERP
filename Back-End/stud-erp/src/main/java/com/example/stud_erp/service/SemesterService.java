package com.example.stud_erp.service;

import com.example.stud_erp.entity.*;
import com.example.stud_erp.payload.*;
import com.example.stud_erp.repository.CourseRepository;
import com.example.stud_erp.repository.SemesterRepository;
import com.example.stud_erp.repository.StudentRepository;
import com.example.stud_erp.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
public class SemesterService {

    @Autowired
    private SemesterRepository semesterRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private PracticalService practicalService;


    public SemesterDTO convertToDTO(Semester semester) {
        try {
            CourseDTO courseDTO = new CourseDTO(
                    semester.getCourse().getId(),
                    semester.getCourse().getCode(),
                    semester.getCourse().getName(),
                    new ProfessorDTO(semester.getCourse().getProfessor().getId(), semester.getCourse().getProfessor().getName())
            );

            StudentDTO studentDTO = new StudentDTO(
                    semester.getStudent().getId(),
                    semester.getStudent().getStudName()
            );

            return new SemesterDTO(
                    semester.getId(),
                    semester.getSemester(),
                    courseDTO,
                    studentDTO
            );
        } catch (Exception e) {
            // Log the exception to see where the issue might be
            e.printStackTrace();
            throw new RuntimeException("Error converting Semester to SemesterDTO: " + e.getMessage());
        }
    }


    public void createSubjects(List<SubjectDTO> subjectDTOs, Semester semester) {
        for (SubjectDTO subjectDTO : subjectDTOs) {
            Subject subject = new Subject();
            subject.setCode(subjectDTO.getCode());
            subject.setName(subjectDTO.getName());
            subject.setCredits(subjectDTO.getCredits());
            subject.setGrade(subjectDTO.getGrade());
            subject.setCt1(subjectDTO.getCt1());
            subject.setCt2(subjectDTO.getCt2());
            subject.setTheory(subjectDTO.getTheory());
            subject.setSemester(semester);

            subjectRepository.save(subject);
        }
    }

    public Semester createSemester(SemesterDTO dto) {
        Long courseId = dto.getCourse().getId();
        Long studentId = dto.getStudent().getId();

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + courseId));

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));

        Semester semester = new Semester();
        semester.setSemester(dto.getSemester());
        semester.setCourse(course);
        semester.setStudent(student);

        // Save the semester first to generate the ID
        semester = semesterRepository.save(semester);

        // Create and save subjects
        createSubjects(dto.getSubjects(), semester);

        // Create and save practicals
        for (PracticalDTO practicalDTO : dto.getPracticals()) {
            Practical practical = new Practical();
            practical.setName(practicalDTO.getName());
            practical.setGrade(practicalDTO.getGrade());
            practical.setWritten(practicalDTO.getWritten());
            practical.setViva(practicalDTO.getViva());
            practical.setSemester(semester);

            practicalService.createPractical(practicalDTO); // Assuming this method exists
        }

        return semester;
    }

}

