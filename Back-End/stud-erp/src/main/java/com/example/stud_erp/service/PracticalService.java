package com.example.stud_erp.service;

import com.example.stud_erp.entity.Practical;
import com.example.stud_erp.entity.Semester;
import com.example.stud_erp.payload.PracticalDTO;
import com.example.stud_erp.repository.PracticalRepository;
import com.example.stud_erp.repository.SemesterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PracticalService {

    @Autowired
    private PracticalRepository practicalRepository;

    @Autowired
    private SemesterRepository semesterRepository;

    public PracticalDTO createPractical(PracticalDTO dto) {
        Semester semester = semesterRepository.findById(dto.getSemesterId())
                .orElseThrow(() -> new RuntimeException("Semester not found with ID: " + dto.getSemesterId()));

        Practical practical = new Practical();
        practical.setName(dto.getName());
        practical.setGrade(dto.getGrade());
        practical.setWritten(dto.getWritten());
        practical.setViva(dto.getViva());
        practical.setSemester(semester);

        Practical savedPractical = practicalRepository.save(practical);
        return convertToDTO(savedPractical);
    }

    public PracticalDTO convertToDTO(Practical practical) {
        return new PracticalDTO(
                practical.getId(),
                practical.getName(),
                practical.getGrade(),
                practical.getWritten(),
                practical.getViva(),
                practical.getSemester().getId()
        );
    }
    public List<PracticalDTO> findAll() {
        List<Practical> practicals = practicalRepository.findAll();
        return practicals.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

}
