package com.example.backend.models;

import com.example.backend.models.base.BaseNameDescription;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Category extends BaseNameDescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @OneToMany(mappedBy = "category", orphanRemoval = true)
    Set<SportItem> sportItems;

    public Category(String name, String description) {
        super(name, description);
    }
}
