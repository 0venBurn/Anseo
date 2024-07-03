package org.example.summer.config;

import lombok.RequiredArgsConstructor;
import org.example.summer.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * AuthenticationConfig class provides the necessary beans for Spring Security authentication and password encoding.
 * It configures the authentication provider, authentication manager, and password encoder.
 */
@Configuration
@RequiredArgsConstructor
public class AuthenticationConfig {

    private final UserService userService;

    /**
     * This bean creates an AuthenticationProvider that uses DaoAuthenticationProvider.
     * The DaoAuthenticationProvider is configured with the userService and BCryptPasswordEncoder
     * This allows us to get users from the database via their email through the userService.
     * It also adds the BCrypt password encoder which ensures the passwords will be encoded in the database.
     * Which lets us check if the users provided password matches the encoded password stored in the database.
     *
     * @return AuthenticationProvider configured with userService and BCryptPasswordEncoder
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    /**
     * Creates an AuthenticationManager bean that processes authentication requests.
     * This is used in the authenticationService to handle a user logging in.
     *
     * @param configuration AuthenticationConfiguration provided by Spring Security.
     * @return AuthenticationManager that manages authentication processes.
     * @throws Exception if there is an error during the creation of the authentication manager.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    /**
     * Creates a PasswordEncoder bean.
     *
     * @return PasswordEncoder that uses BCryptPasswordEncoder for hashing passwords.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
