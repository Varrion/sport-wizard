package com.example.backend.models.dto;

import lombok.Data;

@Data
public class UserDto {
    String email;

    String password;

    String name;

    String surname;

    Boolean gender;

    Integer age;

    String phoneNumber;

    String address;

    String city;

    Boolean isCompanyOwner;
}
