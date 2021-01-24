package com.example.backend.controller;

import com.example.backend.models.SportItem;
import com.example.backend.models.dto.SportItemDto;
import com.example.backend.service.SportItemService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public SportItem getItem(@PathVariable Long id) {
        return itemService.getById(id);
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
}
