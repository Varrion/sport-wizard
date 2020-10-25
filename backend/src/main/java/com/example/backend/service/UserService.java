package com.example.backend.service;

import com.example.backend.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    public List<User>AllUsers();

    public Optional<User> getOneUser(String username);

    public User saveUser(User user);

    public User editUser(User user, String username);

    public void deleteUser(String username);
}
