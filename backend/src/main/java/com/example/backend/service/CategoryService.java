package com.example.backend.service;

import com.example.backend.models.Category;
import com.example.backend.models.SportItems;

import java.util.List;
import java.util.Optional;

public interface CategoryService {

    public List<Category> AllCategory();

    public Optional<Category> getOneCategory(Long id);

    public Category saveCategory(Category category);

    public Category editCategory(Category category, Long id);

    public void deleteCategory(Long id);
}
