package com.example.backend.service.implementation;

import com.example.backend.models.SportItem;
import com.example.backend.models.dto.SportItemDto;
import com.example.backend.repository.SportItemRepository;
import com.example.backend.service.SportItemService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class SportItemServiceImplementation implements SportItemService {
    private final SportItemRepository itemRepository;

    public SportItemServiceImplementation(SportItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public List<SportItem> getAll() {
        return itemRepository.findAll();
    }

    @Override
    public SportItem getById(Long id) {
        return itemRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @Override
    public void deleteById(Long id) {
        itemRepository.deleteById(id);
    }

    @Override
    public SportItem save(SportItemDto entityDto, MultipartFile entityPicture) {
        return null;
    }

    @Override
    public SportItem saveEntity(SportItem entity) {
        return itemRepository.save(entity);
    }

    @Override
    public SportItem update(SportItemDto entityDto, MultipartFile entityPicture, Long entityId) {
        return null;
    }
}
