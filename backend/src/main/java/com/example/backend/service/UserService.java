package com.example.backend.service;

import com.example.backend.models.User;
import com.example.backend.models.dto.UserDto;
import com.example.backend.service.base.BaseGetDeleteService;
import com.example.backend.service.base.BaseSaveUpdateService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

public interface UserService extends UserDetailsService, BaseGetDeleteService<User, String>, BaseSaveUpdateService<User, UserDto, MultipartFile, String> {
}
