//package org.example.summer.service;
//
//import lombok.RequiredArgsConstructor;
//import org.example.summer.dao.RefreshTokenRepository;
//import org.example.summer.entity.RefreshToken;
//import org.example.summer.entity.User;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.time.Instant;
//import java.util.Optional;
//import java.util.UUID;
//
//@Service
//@RequiredArgsConstructor
//public class RefreshTokenService {
//    private final RefreshTokenRepository refreshTokenRepository;
//    private final UserService userService;
//
//    public RefreshToken createRefreshToken(String email) {
//
//        RefreshToken refreshToken = RefreshToken.builder()
//                .user(userService.loadUserByUsername(email))
//                .token(UUID.randomUUID().toString())
//                .expiryDate(Instant.now().plusMillis(60000 * 6 * 24 * 7))
//                .build();
//        return refreshTokenRepository.save(refreshToken);
//    }
//
//    public Optional<RefreshToken> findByToken(String token) {
//        return refreshTokenRepository.findByToken(token);
//    }
//
//    public RefreshToken verifyExpiration(RefreshToken token) {
//        if (token.getExpiryDate().isBefore(Instant.now())) {
//            refreshTokenRepository.delete(token);
//        throw new RuntimeException(token.getToken() + " Refresh token is expired. Please login again.");
//        }
//        return token;
//    }
//}
