package com.example.backend.models.dto;

import com.sun.istack.NotNull;
import lombok.Data;

@Data
public class ChargeDto {
    @NotNull
    String stripeEmail;

    @NotNull
    String stripeToken;

    @NotNull
    Boolean isFromCart;

    @NotNull
    Integer amount;
}
