package com.example.backend.service;

import com.example.backend.models.SportItem;
import com.example.backend.models.dto.CartDto;
import com.example.backend.models.dto.ChargeDto;
import com.example.backend.models.dto.SportItemDto;
import com.example.backend.service.base.BaseGetDeleteService;
import com.example.backend.service.base.BaseSaveUpdateService;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface SportItemService extends BaseGetDeleteService<SportItem, Long>, BaseSaveUpdateService<SportItem, SportItemDto, MultipartFile, Long> {
    List<SportItem> getItemsByCategory(Long categoryId);

    List<SportItem> getItemsByCompany(Long companyId);

    void UpdateItemsInShoppingCart(CartDto cartDto);

    void ClearItemsFromShoppingCart(String userEmail);

    Charge Charge(ChargeDto chargeDto) throws StripeException;
}
