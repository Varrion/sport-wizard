package com.example.backend.repository;

import com.example.backend.models.SportCompany;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

public interface SportCompanyRepository extends JpaRepository<SportCompany, Long> {
    @Transactional
    SportCompany findSportCompanyByCompanyOwnerEmail(String email);
}
