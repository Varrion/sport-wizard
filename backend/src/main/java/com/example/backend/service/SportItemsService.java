package com.example.backend.service;

import com.example.backend.models.SportItems;
import com.example.backend.models.User;

import java.util.List;
import java.util.Optional;

public interface SportItemsService {

    public List<SportItems> AllSportItems();

    public Optional<SportItems> getOneSportItems(Long id);

    public SportItems saveSportItems(SportItems sportItems);

    public SportItems editSportItems(SportItems sportItems, Long id);

    public void deleteSportItems(Long id);
}
