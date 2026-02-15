package com.example.stud_erp.service;


import com.example.stud_erp.entity.ClassSession;
import com.example.stud_erp.repository.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClassService {

    @Autowired
    private ClassRepository classRepository;

    public List<ClassSession> getAllClasses() {
        return classRepository.findAll();
    }

    public ClassSession getClassById(Long id) {
        return classRepository.findById(id).orElse(null);
    }

    public ClassSession saveClass(ClassSession clazz) {
        return classRepository.save(clazz);
    }

    public void deleteClass(Long id) {
        classRepository.deleteById(id);
    }
}
