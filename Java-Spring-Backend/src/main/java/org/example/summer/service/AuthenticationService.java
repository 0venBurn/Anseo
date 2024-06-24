package org.example.summer.service;

import lombok.RequiredArgsConstructor;
import org.example.summer.dto.AuthenticationRequest;
import org.example.summer.dto.AuthenticationResponse;
import org.example.summer.dto.RegisterRequest;
import org.example.summer.dao.UserRepository;
import org.example.summer.entity.Role;
import org.example.summer.entity.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service class for handling user authentication (login) and registration (signup)
 */
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Saves a new user to the database and generates a token for them.
     *
     * @param request the registration request containing the users details.
     * @return the authentication response containing the JWT token.
     */
    public AuthenticationResponse register(RegisterRequest request) {
        User user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    /**
     * Authenticates an existing user to log them in and generates a token for them
     * If the authentication fails the authenticationManager throws an AuthenticationException.
     *
     * @param request the authentication request containing the users details.
     * @return the authentication response containing the JWT token.
     */
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var user = (User) userService.loadUserByUsername(request.getEmail());
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
