package com.example.backend.service;

import com.example.backend.models.dto.CategoryDto;
import com.example.backend.models.Category;
import com.example.backend.service.base.BaseGetDeleteService;

public interface CategoryService extends BaseGetDeleteService<Category, Long> {

    Category saveCategory(CategoryDto categoryDto);

    Category editCategory(CategoryDto categoryDto, Long id);
}
