package com.example.stud_erp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class 	StudErpApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudErpApplication.class, args);
	}

}

	