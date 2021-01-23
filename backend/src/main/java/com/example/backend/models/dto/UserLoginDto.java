package com.example.backend.models.dto;

import lombok.Data;

@Data
public class UserLoginDto {
    String email;

    String password;
}
