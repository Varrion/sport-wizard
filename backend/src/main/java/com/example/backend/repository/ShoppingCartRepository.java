package com.example.backend.repository;

import com.example.backend.models.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.Optional;

public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
    @Transactional
    Optional<ShoppingCart> findShoppingCartByCartOwnerEmail(String email);
}
