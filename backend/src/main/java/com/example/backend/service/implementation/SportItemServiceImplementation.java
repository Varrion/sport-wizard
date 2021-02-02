package com.example.backend.service.implementation;

import com.example.backend.models.Category;
import com.example.backend.models.ShoppingCart;
import com.example.backend.models.SportCompany;
import com.example.backend.models.SportItem;
import com.example.backend.models.dto.CartDto;
import com.example.backend.models.dto.ChargeDto;
import com.example.backend.models.dto.SportItemDto;
import com.example.backend.models.enums.ItemGender;
import com.example.backend.models.enums.Sport;
import com.example.backend.repository.ShoppingCartRepository;
import com.example.backend.repository.SportItemRepository;
import com.example.backend.service.CategoryService;
import com.example.backend.service.SportCompanyService;
import com.example.backend.service.SportItemService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.beans.factory.annotation.Value;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class SportItemServiceImplementation implements SportItemService {
    private final SportItemRepository itemRepository;
    private final CategoryService categoryService;
    private final SportCompanyService companyService;
    private final ShoppingCartRepository cartRepository;

    @Value("${stripe-sk}")
    private String secretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    }

    public SportItemServiceImplementation(SportItemRepository itemRepository, CategoryService categoryService, SportCompanyService companyService, ShoppingCartRepository cartRepository) {
        this.itemRepository = itemRepository;
        this.categoryService = categoryService;
        this.companyService = companyService;
        this.cartRepository = cartRepository;
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
    public SportItem save(SportItemDto entityDto, MultipartFile entityPicture) throws IOException {
        SportItem sportItem = DtoToItem(entityDto, null);

        if (entityPicture != null) {
            sportItem.setPicture(entityPicture.getBytes());
        }

        return saveEntity(sportItem);
    }

    @Override
    public SportItem saveEntity(SportItem entity) {
        return itemRepository.save(entity);
    }

    @Override
    public SportItem update(SportItemDto entityDto, MultipartFile entityPicture, Long entityId) throws IOException {
        SportItem sportItem = DtoToItem(entityDto, entityId);

        if (entityPicture != null) {
            sportItem.setPicture(entityPicture.getBytes());
        }

        return saveEntity(sportItem);
    }

    @Override
    public List<SportItem> getItemsByCategory(Long categoryId) {
        return itemRepository.getAllByCategoryId(categoryId);
    }

    @Override
    public List<SportItem> getItemsByCompany(Long companyId) {
        return itemRepository.getAllBySportCompanyId(companyId);
    }

    @Override
    public void UpdateItemsInShoppingCart(CartDto cartDto) {
        ShoppingCart cart = findCartByUser(cartDto.getUserEmail());

        SportItem item = getById(cartDto.getItemId());
        Set<SportItem> cartItems = cart.getItems();
        if (cartItems.contains(item)) {
            cartItems.remove(item);
        } else {
            cartItems.add(item);
        }

        cart.setItems(cartItems);
        cartRepository.save(cart);
    }

    @Override
    public void ClearItemsFromShoppingCart(String userEmail) {
        ShoppingCart cart = findCartByUser(userEmail);
        cart.setItems(null);
        cartRepository.save(cart);
    }

    @Override
    public Charge Charge(ChargeDto chargeDto) throws StripeException {
        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", chargeDto.getAmount());
        chargeParams.put("currency", "USD");
        chargeParams.put("receipt_email", chargeDto.getStripeEmail());
        chargeParams.put("source", chargeDto.getStripeToken());

        ClearItemsFromShoppingCart(chargeDto.getStripeEmail());
        return Charge.create(chargeParams);
    }

    private SportItem DtoToItem(SportItemDto sportItemDto, @Nullable Long id) {
        SportItem sportItem = new SportItem();

        if (id != null) {
            sportItem = getById(id);
        }

        sportItem.setName(sportItemDto.getName());
        sportItem.setDescription(sportItemDto.getDescription());
        sportItem.setPrice(sportItemDto.getPrice());

        if (sportItemDto.getSport() != null) {
            Sport sport = Sport.valueOf(sportItemDto.getSport());
            sportItem.setSport(sport);
        }

        if (sportItemDto.getItemGender() != null) {
            ItemGender itemGender = ItemGender.valueOf(sportItemDto.getItemGender());
            sportItem.setItemGender(itemGender);
        }

        if (sportItemDto.getCategoryId() != null) {
            Category category = categoryService.getById(sportItemDto.getCategoryId());
            sportItem.setCategory(category);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        if (sportItemDto.getCompanyId() != null) {
            SportCompany company = companyService.getById(sportItemDto.getCompanyId());
            sportItem.setSportCompany(company);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        return sportItem;
    }

    private ShoppingCart findCartByUser(String userEmail) {
        return cartRepository.findShoppingCartByCartOwnerEmail(userEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
