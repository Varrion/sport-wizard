package com.example.backend.controller;

import com.example.backend.service.SportItemService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/item")
public class SportItemController {
    private final SportItemService itemService;

    public SportItemController(SportItemService itemService) {
        this.itemService = itemService;
    }
}
