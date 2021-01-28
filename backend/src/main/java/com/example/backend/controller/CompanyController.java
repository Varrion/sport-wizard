package com.example.backend.controller;

import com.example.backend.models.SportCompany;
import com.example.backend.models.dto.SportCompanyDto;
import com.example.backend.service.SportCompanyService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/company")
public class CompanyController {
    private final SportCompanyService companyService;

    public CompanyController(SportCompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping
    List<SportCompany> getAllCompanies() {
        return companyService.getAll();
    }

    @GetMapping("/{id}")
    SportCompany getCompanyDetails(@PathVariable Long id) {
        return companyService.getById(id);
    }

    @GetMapping("my-company")
    SportCompany getMyCompanyDetails(@RequestParam("ownerEmail") String email) {
        return companyService.findByCompanyOwner(email);
    }

    @PostMapping
    SportCompany addCompany(@RequestPart("companyDto") SportCompanyDto companyDto,
                            @RequestPart("companyPicture") Optional<MultipartFile> companyPicture) throws IOException {
        return companyService.save(companyDto, companyPicture.orElse(null));
    }

    @PutMapping("{id}")
    SportCompany editCompany(@PathVariable Long id, @RequestPart("companyDto") SportCompanyDto sportCompanyDto,
                             @RequestPart("companyPicture") Optional<MultipartFile> companyPicture) throws IOException {
        return companyService.update(sportCompanyDto, companyPicture.orElse(null), id);
    }

    @DeleteMapping(value = "{id}")
    void deleteCompany(@PathVariable Long id) {
        companyService.deleteById(id);
    }
}
