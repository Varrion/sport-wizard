package com.example.backend.models.dto;

import com.sun.istack.NotNull;
import com.sun.istack.Nullable;
import lombok.Data;

@Data
public class UserDto {
    @NotNull
    String email;

    @NotNull
    String password;

    @NotNull
    String name;

    @NotNull
    String surname;

    @Nullable
    Integer age;

    @Nullable
    String phoneNumber;

    @Nullable
    String address;

    @Nullable
    String city;

    @Nullable
    Boolean isCompanyOwner;
}
