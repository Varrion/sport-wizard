package com.example.backend.service.implementation;

import com.example.backend.models.User;
import com.example.backend.models.dto.UserDto;
import com.example.backend.models.dto.UserLoginDto;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@Service
public class UserServiceImplementation implements UserService {
    private final UserRepository userRepository;

    public UserServiceImplementation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User getById(String id) {
        return userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Invalid email address."));
    }

    @Override
    public void deleteById(String id) {
        userRepository.deleteById(id);
    }

    @Override
    public User save(UserDto entityDto, MultipartFile entityPicture) throws IOException {
        User user = DtoToUser(entityDto, null);

        user.setIsCompanyOwner(entityDto.getIsCompanyOwner());
        user.setHasCreatedCompany(false);
        if (entityPicture != null) {
            user.setPicture(entityPicture.getBytes());
        }

        return saveEntity(user);
    }

    @Override
    public User saveEntity(User entity) {
        return userRepository.save(entity);
    }

    @Override
    public User update(UserDto entityDto, MultipartFile entityPicture, String entityId) throws IOException {
        User user = DtoToUser(entityDto, entityId);

        if (entityPicture != null) {
            user.setPicture(entityPicture.getBytes());
        }

        return saveEntity(user);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return getById(s);
    }

    private User DtoToUser(UserDto userDto, @Nullable String email) {
        User user = new User();
        if (email != null) {
            user = getById(email);
        }

        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());
        user.setGender(userDto.getGender());
        user.setAge(userDto.getAge());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setAddress(userDto.getAddress());
        user.setCity(userDto.getCity());

        return user;
    }

    @Override
    public User signInUser(UserLoginDto loginDto) {
        User user = (User) loadUserByUsername(loginDto.getEmail());
        if (user.getPassword().equals(loginDto.getPassword())) {
            return user;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
}
