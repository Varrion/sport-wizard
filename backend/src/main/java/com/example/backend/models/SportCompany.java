package com.example.backend.models;

import com.example.backend.models.base.BaseNameDescription;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class SportCompany extends BaseNameDescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    Date creationDate;

    String email;

    String contactNumber;

    String address;

    String city;

    @OneToOne
    User companyOwner;

    @OneToMany(mappedBy = "sportCompany", orphanRemoval = true)
    Set<SportItem> sportItems;

    @Lob
    byte[] picture;
}
