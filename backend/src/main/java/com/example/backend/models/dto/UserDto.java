package com.example.backend.models.dto;

import lombok.Data;

@Data
public class UserDto {
    String username;

    String password;

    String name;

    String surname;

    Boolean gender;

    Integer age;

    String email;

    String phoneNumber;

    String address;

    String city;

    Boolean isCompanyOwner;
}
