package com.example.backend.service.implementation;

import com.example.backend.models.SportCompany;
import com.example.backend.models.User;
import com.example.backend.models.dto.SportCompanyDto;
import com.example.backend.repository.SportCompanyRepository;
import com.example.backend.service.SportCompanyService;
import com.example.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@Service
public class SportCompanyServiceImplementation implements SportCompanyService {
    private final SportCompanyRepository companyRepository;
    private final UserService userService;

    public SportCompanyServiceImplementation(SportCompanyRepository companyRepository, UserService userService) {
        this.companyRepository = companyRepository;
        this.userService = userService;
    }

    @Override
    public List<SportCompany> getAll() {
        return companyRepository.findAll();
    }

    @Override
    public SportCompany getById(Long id) {
        return companyRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @Override
    public void deleteById(Long id) {
        SportCompany sportCompany = getById(id);

        User companyOwner = sportCompany.getCompanyOwner();
        companyOwner.setHasCreatedCompany(false);

        userService.saveEntity(companyOwner);
        companyRepository.deleteById(id);
    }

    @Override
    public SportCompany save(SportCompanyDto entityDto, MultipartFile entityPicture) throws IOException {
        SportCompany sportCompany = DtoToCompany(entityDto, null);

        User companyOwner = userService.getById(entityDto.getCompanyOwnerUsername());
        if (companyOwner.getIsCompanyOwner() && !companyOwner.getHasCreatedCompany()) {
            sportCompany.setCompanyOwner(companyOwner);

            companyOwner.setHasCreatedCompany(true);
            userService.saveEntity(companyOwner);
        }

        if (entityPicture != null) {
            sportCompany.setPicture(entityPicture.getBytes());
        }

        return companyRepository.save(sportCompany);
    }

    @Override
    public SportCompany saveEntity(SportCompany entity) {
        return companyRepository.save(entity);
    }

    @Override
    public SportCompany update(SportCompanyDto entityDto, MultipartFile entityPicture, Long entityId) throws IOException {
        SportCompany sportCompany = DtoToCompany(entityDto, entityId);

        if (entityPicture != null) {
            sportCompany.setPicture(entityPicture.getBytes());
        }

        return saveEntity(sportCompany);
    }

    private SportCompany DtoToCompany(SportCompanyDto companyDto, @Nullable Long companyId) {
        SportCompany sportCompany = new SportCompany();
        if (companyId != null) {
            sportCompany = getById(companyId);
        }

        sportCompany.setName(companyDto.getName());
        sportCompany.setDescription(companyDto.getDescription());
        sportCompany.setCreationDate(companyDto.getCreationDate());
        sportCompany.setEmail(companyDto.getEmail());
        sportCompany.setContactNumber(companyDto.getContactNumber());
        sportCompany.setAddress(companyDto.getAddress());
        sportCompany.setCity(companyDto.getCity());

        return sportCompany;
    }
}
