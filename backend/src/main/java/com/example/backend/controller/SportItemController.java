package com.example.backend.controller;

import com.example.backend.models.SportItem;
import com.example.backend.models.dto.CartDto;
import com.example.backend.models.dto.ChargeDto;
import com.example.backend.models.dto.SportItemDto;
import com.example.backend.service.SportItemService;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/item")
public class SportItemController {
    private final SportItemService itemService;

    public SportItemController(SportItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    List<SportItem> getAllItems() {
        return itemService.getAll();
    }

    @GetMapping("/{id}")
    SportItem getItem(@PathVariable Long id) {
        return itemService.getById(id);
    }

    @GetMapping("category/{categoryId}")
    List<SportItem> getItemsByCategory(@PathVariable Long categoryId) {
        return itemService.getItemsByCategory(categoryId);
    }

    @GetMapping("company/{companyId}")
    List<SportItem> getItemsByCompany(@PathVariable Long companyId) {
        return itemService.getItemsByCompany(companyId);
    }

    @PostMapping
    SportItem addItem(@RequestPart("itemDto") SportItemDto itemDto,
                      @RequestPart("itemPicture") Optional<MultipartFile> itemPicture) throws IOException {
        return itemService.save(itemDto, itemPicture.orElse(null));
    }

    @PutMapping("{id}")
    SportItem editItem(@PathVariable Long id, @RequestPart("itemDto") SportItemDto itemDto,
                       @RequestPart("itemPicture") Optional<MultipartFile> itemPicture) throws IOException {
        return itemService.update(itemDto, itemPicture.orElse(null), id);
    }

    @DeleteMapping(value = "{id}")
    void deleteItem(@PathVariable Long id) {
        itemService.deleteById(id);
    }

    //Shopping Cart Section
    @PostMapping("clear-cart")
    void clearUserCart(@RequestBody String userEmail) {
        itemService.ClearItemsFromShoppingCart(userEmail);
    }

    @PostMapping("update-cart")
    void updateUserCart(@RequestBody CartDto cartDto) {
        itemService.UpdateItemsInShoppingCart(cartDto);
    }

    @PostMapping("charge")
    void chargeItems(@RequestBody ChargeDto chargeDto) throws StripeException {
        Charge charge = itemService.Charge(chargeDto);
        if (charge.getId() == null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }
}
