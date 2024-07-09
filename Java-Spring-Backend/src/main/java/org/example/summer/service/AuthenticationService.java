//package org.example.summer.service;
//
//import lombok.RequiredArgsConstructor;
//import org.example.summer.dto.AuthenticationRequest;
//import org.example.summer.dto.AuthenticationResponse;
//import org.example.summer.dto.RefreshTokenRequest;
//import org.example.summer.dto.RegisterRequest;
//import org.example.summer.dao.UserRepository;
//import org.example.summer.entity.RefreshToken;
//import org.example.summer.entity.Role;
//import org.example.summer.entity.User;
//import org.example.summer.exception.UserAlreadyExistsException;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
///**
// * Service class for handling user authentication (login) and registration (signup)
// */
//@Service
//@RequiredArgsConstructor
//public class AuthenticationService {
//
//    private final UserRepository userRepository;
//    private final UserService userService;
//    private final PasswordEncoder passwordEncoder;
//    private final JwtService jwtService;
//    private final AuthenticationManager authenticationManager;
//    private final RefreshTokenService refreshTokenService;
//
//    /**
//     * Saves a new user to the database and generates a token for them.
//     *
//     * @param request the registration request containing the users details.
//     * @return the authentication response containing the JWT token.
//     */
//    public AuthenticationResponse register(RegisterRequest request) throws UserAlreadyExistsException {
//        var dbUser = userService.findByEmail(request.getEmail());
//        if (dbUser.isPresent()) {
//            throw new UserAlreadyExistsException("Username " + request.getEmail() + " already exists");
//        }
//
//        User user = User.builder()
//                .firstname(request.getFirstName())
//                .lastname(request.getLastName())
//                .email(request.getEmail())
//                .password(passwordEncoder.encode(request.getPassword()))
//                .role(Role.USER)
//                .build();
//        userRepository.save(user);
//
//        // refresh token created on signup
//        RefreshToken refreshToken = refreshTokenService.createRefreshToken(request.getEmail());
//
//        return AuthenticationResponse.builder()
//                .firstName(request.getFirstName())
//                .lastName(request.getLastName())
//                .email(request.getEmail())
//                .accessToken(jwtService.generateToken(user))
//                .refreshToken(refreshToken.getToken())
//                .build();
//    }
//
//    /**
//     * Authenticates an existing user to log them in and generates a token for them
//     * If the authentication fails the authenticationManager throws an AuthenticationException.
//     *
//     * @param request the authentication request containing the users details.
//     * @return the authentication response containing the JWT token.
//     */
//    // need to handle token errors
//    public AuthenticationResponse authenticate(AuthenticationRequest request) {
//        var user = (User) userService.loadUserByUsername(request.getEmail());
//
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        request.getEmail(),
//                        request.getPassword()
//                )
//        );
//        // refresh token created here and added to table for user on login
//        RefreshToken refreshToken = refreshTokenService.createRefreshToken(request.getEmail());
//
//        return AuthenticationResponse.builder()
//                .firstName(user.getFirstname())
//                .lastName(user.getLastname())
//                .email(request.getEmail())
//                .accessToken(jwtService.generateToken(user))
//                .refreshToken(refreshToken.getToken())
//                .build();
//    }
//
//    public AuthenticationResponse refreshAccessToken(RefreshTokenRequest refreshTokenRequest) {
//        return refreshTokenService
//                .findByToken(refreshTokenRequest.getRefreshToken())
//                .map(refreshTokenService::verifyExpiration)
//                .map(RefreshToken::getUser)
//                .map(user -> {
//                    String accessToken = jwtService.generateToken(user);
//                    return AuthenticationResponse
//                            .builder()
//                            .accessToken(accessToken)
//                            .refreshToken(refreshTokenRequest.getRefreshToken())
//                            .build();
//                }).orElseThrow(() -> new RuntimeException("Refresh token not found in db."));
//    }
//}
