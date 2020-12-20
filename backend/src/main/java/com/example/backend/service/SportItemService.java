package com.example.backend.service;

import com.example.backend.models.SportItem;
import com.example.backend.models.dto.SportItemDto;
import com.example.backend.service.base.BaseGetDeleteService;
import com.example.backend.service.base.BaseSaveUpdateService;
import org.springframework.web.multipart.MultipartFile;

public interface SportItemService extends BaseGetDeleteService<SportItem, Long>, BaseSaveUpdateService<SportItem, SportItemDto, MultipartFile, Long> {

}
