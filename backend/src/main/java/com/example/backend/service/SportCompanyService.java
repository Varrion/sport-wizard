package com.example.backend.service;

import com.example.backend.models.SportCompany;
import com.example.backend.models.dto.SportCompanyDto;
import com.example.backend.service.base.BaseGetDeleteService;
import com.example.backend.service.base.BaseSaveUpdateService;
import org.springframework.web.multipart.MultipartFile;

public interface SportCompanyService extends BaseGetDeleteService<SportCompany, Long>, BaseSaveUpdateService<SportCompany, SportCompanyDto, MultipartFile, Long> {
}
