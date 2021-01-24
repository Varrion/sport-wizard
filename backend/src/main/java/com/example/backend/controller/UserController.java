package com.example.backend.controller;

import com.example.backend.models.User;
import com.example.backend.models.dto.UserDto;
import com.example.backend.models.dto.UserLoginDto;
import com.example.backend.service.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAll();
    }

    @GetMapping("/{email}")
    public User getOneUser(@PathVariable String email) {
        return userService.getById(email);
    }

    @PostMapping("/sign-in")
    public User SignInUser(@RequestBody UserLoginDto loginDto) {
        return userService.signInUser(loginDto);
    }

    @PostMapping
    public User SignUpUser(@RequestBody UserDto userDto) throws IOException {
        return userService.save(userDto, null);
    }

    @PutMapping("/{email}")
    public User editUser(@PathVariable String email, @RequestPart("userDto") UserDto userDto,
                         @RequestPart("accountPicture") Optional<MultipartFile> userPicture) throws IOException {
        return userService.update(userDto, userPicture.orElse(null), email);
    }

    @DeleteMapping("/{email}")
    public void deleteUser(@PathVariable String email) {
        userService.deleteById(email);
    }
}
