package com.example.backend.controller;

import com.example.backend.models.Category;
import com.example.backend.models.dto.CategoryDto;
import com.example.backend.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/category")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    List<Category> getAllCategories() {
        return categoryService.getAll();
    }

    @GetMapping("/{id}")
    public Category getCategory(@PathVariable Long id) {
        return categoryService.getById(id);
    }

    @PostMapping
    Category addCategory(@RequestBody CategoryDto categoryDto) {
        return categoryService.saveCategory(categoryDto);
    }

    @PutMapping("{id}")
    Category editCategory(@PathVariable Long id, @RequestBody CategoryDto categoryDto) {
        return categoryService.editCategory(categoryDto, id);
    }

    @DeleteMapping(value = "{id}")
    void deleteCategory(@PathVariable Long id) {
        categoryService.deleteById(id);
    }
}
