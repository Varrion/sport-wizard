package com.example.backend.repository;

import com.example.backend.models.SportItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface SportItemRepository extends JpaRepository<SportItem, Long> {
    @Transactional
    List<SportItem> getAllByCategoryId(Long categoryId);

    @Transactional
    List<SportItem> getAllBySportCompanyId(Long companyId);
}
