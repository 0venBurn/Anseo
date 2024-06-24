package org.example.summer.service;

import lombok.RequiredArgsConstructor;
import org.example.summer.dao.UserRepository;
import org.example.summer.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


/**
 * Service class used to get Users details from the database (through userRepository)
 */
@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    /**
     * Loads the user by email and returns the User Entity containing the userDetails.
     *
     * @param email the email identifying the user whose data is required.
     * @return User Entity for the user.
     * @throws UsernameNotFoundException if the email address is not in the database.
     */
    @Override
    public User loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
    }
}