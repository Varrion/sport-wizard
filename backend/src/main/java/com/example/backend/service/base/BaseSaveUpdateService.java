package com.example.backend.service.base;

import java.io.IOException;

public interface BaseSaveUpdateService<T, K, V, N> {
    T save(K entityDto, V entityPicture) throws IOException;

    T saveEntity(T entity);

    T update(K entityDto, V entityPicture, N entityId) throws IOException;
}
