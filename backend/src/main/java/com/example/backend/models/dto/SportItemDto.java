package com.example.backend.models.dto;

import com.example.backend.models.base.BaseNameDescription;
import lombok.Data;

@Data
public class SportItemDto extends BaseNameDescription {
    Integer price;

    String sport;

    String itemGender;

    Long categoryId;

    Long companyId;
}
