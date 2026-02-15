package com.example.stud_erp.controller;

import com.example.stud_erp.entity.Practical;
import com.example.stud_erp.payload.PracticalDTO;
import com.example.stud_erp.repository.PracticalRepository;
import com.example.stud_erp.service.PracticalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/practicals")
public class PracticalController {

    @Autowired
    private PracticalService practicalService;

    @Autowired
    private PracticalRepository practicalRepository;

    @PostMapping("/add")
    public ResponseEntity<PracticalDTO> createPractical(@RequestBody PracticalDTO dto) {
        try {
            PracticalDTO savedPractical = practicalService.createPractical(dto);
            return ResponseEntity.ok().body(savedPractical);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<PracticalDTO>> getAllPracticals() {
        try {
            List<PracticalDTO> practicals = practicalService.findAll();
            return ResponseEntity.ok().body(practicals);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PracticalDTO> getPractical(@PathVariable Long id) {
        Practical practical = practicalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Practical not found with ID: " + id));
        PracticalDTO dto = practicalService.convertToDTO(practical);
        return ResponseEntity.ok().body(dto);
    }

}
