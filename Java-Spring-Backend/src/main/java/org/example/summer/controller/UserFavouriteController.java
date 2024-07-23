package org.example.summer.controller;

import lombok.RequiredArgsConstructor;
import org.example.summer.dto.UserFavouriteRequest;
import org.example.summer.dto.UserFavouriteResponse;
import org.example.summer.entity.UserFavourite;
import org.example.summer.service.UserFavouriteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user-favourites")
@RequiredArgsConstructor
@CrossOrigin
public class UserFavouriteController {

    private static final Logger logger = LoggerFactory.getLogger(UserFavouriteController.class);
    private final UserFavouriteService userFavouriteService;

    @GetMapping(value = "/{clerkUserId}")
    public ResponseEntity<UserFavouriteResponse> getUserFavourites(@PathVariable("clerkUserId") String clerkUserId) {
        logger.info("getUserFavourites clerkUserId={}", clerkUserId);
        return ResponseEntity.ok(userFavouriteService.getAllUserFavourites(clerkUserId));
    }

    @PostMapping(value = "/{clerkUserId}")
    public ResponseEntity<List<UserFavourite>> createUserFavourite(@PathVariable ("clerkUserId") String clerkUserId,
                                                                   @RequestBody UserFavouriteRequest userFavouriteRequest) throws Exception {
        logger.info("Create user favourite: {}", userFavouriteRequest);
        return ResponseEntity.ok(userFavouriteService.saveUserFavourite(userFavouriteRequest));
    }

    @DeleteMapping(value = "/{clerkUserId}/{neighbourhoodId}")
    public ResponseEntity<Void> deleteUserFavourite(@PathVariable("clerkUserId") String clerkUserId,
                                                    @PathVariable("neighbourhoodId") Integer neighbourhoodId) throws Exception {
        userFavouriteService.deleteUserFavourite(clerkUserId, neighbourhoodId);
        return ResponseEntity.noContent().build();
    }
}
