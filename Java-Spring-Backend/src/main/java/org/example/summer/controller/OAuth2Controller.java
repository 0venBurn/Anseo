package org.example.summer.controller;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.example.summer.service.JwtService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/OAuth2")
@RequiredArgsConstructor
@CrossOrigin
public class OAuth2Controller {

    private final JwtService jwtService;

    @PostMapping("/")
    public Claims processJwt(String token) {
        return jwtService.getAllClaims(token);
    }
}
