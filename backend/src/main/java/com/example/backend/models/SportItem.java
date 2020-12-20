package com.example.backend.models;

import com.example.backend.models.base.BaseNameDescription;
import com.example.backend.models.enums.ItemGender;
import com.example.backend.models.enums.Sport;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SportItem extends BaseNameDescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    Integer price;

    @Enumerated(EnumType.STRING)
    Sport sport;

    @Enumerated(EnumType.STRING)
    ItemGender itemGender;

    @ManyToOne
    Category category;

    @ManyToOne
    SportCompany sportCompany;

    @ManyToMany
    Set<ShoppingCart> shoppingCarts;

    @Lob
    byte[] picture;
}
