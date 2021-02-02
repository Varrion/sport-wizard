package com.example.backend.models.dto;

import com.sun.istack.NotNull;
import lombok.Data;

@Data
public class CartDto {
    @NotNull
    Long itemId;

    @NotNull
    String userEmail;
}
