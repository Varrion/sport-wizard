package com.example.backend.models.base;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.MappedSuperclass;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@MappedSuperclass
public class BaseNameDescription {
    String name;

    String description;
}
