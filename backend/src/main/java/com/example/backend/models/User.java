package com.example.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    @Id
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

    Boolean hasCreatedCompany;

    @OneToOne(mappedBy = "cartOwner")
    ShoppingCart shoppingCart;

    @OneToOne(mappedBy = "companyOwner")
    SportCompany sportCompany;

    @Lob
    byte[] picture;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
