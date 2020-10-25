package com.example.backend.repository;

import com.example.backend.models.SportItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SportItemsRepository extends JpaRepository<SportItems, Long> {
}
