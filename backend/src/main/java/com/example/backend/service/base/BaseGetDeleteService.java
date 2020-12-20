package com.example.backend.service.base;

import java.util.List;

public interface BaseGetDeleteService<T, K> {
    List<T> getAll();

    T getById(K id);

    void deleteById(K id);
}
