package com.example.backend.models.dto;

import com.example.backend.models.base.BaseNameDescription;
import lombok.Data;

import java.util.Date;

@Data
public class SportCompanyDto extends BaseNameDescription {
    Date creationDate;

    String email;

    String contactNumber;

    String address;

    String city;

    String companyOwnerUsername;
}
