package com.example.backend.service;

import com.example.backend.models.Category;
import com.example.backend.service.base.BaseGetDeleteService;

public interface CategoryService extends BaseGetDeleteService<Category, Long> {

    Category saveCategory(Category category);

    Category editCategory(Category category, Long id);
}
