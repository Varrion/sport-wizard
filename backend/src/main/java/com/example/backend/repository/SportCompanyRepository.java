package com.example.backend.repository;

import com.example.backend.models.SportCompany;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SportCompanyRepository extends JpaRepository<SportCompany, Long> {
}
