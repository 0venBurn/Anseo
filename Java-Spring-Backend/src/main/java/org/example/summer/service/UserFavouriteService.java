package org.example.summer.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.summer.dao.UserFavouriteRepository;
import org.example.summer.dto.UserFavouriteRequest;
import org.example.summer.dto.UserFavouriteResponse;
import org.example.summer.entity.User;
import org.example.summer.entity.UserFavourite;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserFavouriteService {

    private static final Logger logger = LoggerFactory.getLogger(UserFavouriteService.class);

    private final UserFavouriteRepository userFavouriteRepository;
    private final UserService userService;

    public UserFavouriteResponse getAllUserFavourites(String id) {
        User user = userService.findUserById(id);
        List<UserFavourite> favourites = userFavouriteRepository.findByClerkUserId(user.getClerkUserId());
        List<Integer> neighbourhoodIds = favourites.stream()
                .map(UserFavourite::getNeighbourhoodId)
                .toList();

        return UserFavouriteResponse.builder()
                .favourites(neighbourhoodIds)
                .hasFavourites(!favourites.isEmpty())
                .build();
    }

    public List<UserFavourite> saveUserFavourite(UserFavouriteRequest userFavouriteRequest) {
        UserFavourite userFavourite = UserFavourite.builder()
                .clerkUserId(userFavouriteRequest.getClerkUserId())
                .neighbourhoodId(userFavouriteRequest.getNeighbourhoodId())
                .build();

        userFavouriteRepository.save(userFavourite);
        return userFavouriteRepository.findByClerkUserId(userFavouriteRequest.getClerkUserId());
    }

    @Transactional
    public void deleteUserFavourite(String clerkUserId, Integer neighbourhoodId) {
        userFavouriteRepository.deleteByClerkUserIdAndNeighbourhoodId(
                clerkUserId,
                neighbourhoodId);
    }


}
