package com.example.backend.models;

import com.example.backend.models.base.BaseNameDescription;
import com.example.backend.models.enums.ItemGender;
import com.example.backend.models.enums.Sport;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
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
    @JsonIgnore
    Set<ShoppingCart> shoppingCarts;

    @Lob
    byte[] picture;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SportItem)) return false;
        if (!super.equals(o)) return false;
        SportItem sportItem = (SportItem) o;
        return getId().equals(sportItem.getId()) && Objects.equals(getPrice(), sportItem.getPrice()) && getSport() == sportItem.getSport() && getItemGender() == sportItem.getItemGender();
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), getId(), getPrice(), getSport(), getItemGender());
    }
}
