package com.example.backend.models;

import com.example.backend.models.base.BaseNameDescription;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString
public class Category extends BaseNameDescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @OneToMany(mappedBy = "category", orphanRemoval = true)
    @JsonIgnore
    Set<SportItem> sportItems;

    public Category(String name, String description) {
        super(name, description);
    }


}
