package com.example.backend.controller;

import com.example.backend.service.SportCompanyService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/company")
public class CompanyController {
    private final SportCompanyService companyService;

    public CompanyController(SportCompanyService companyService) {
        this.companyService = companyService;
    }
}
