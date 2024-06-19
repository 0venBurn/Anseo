package org.example.summer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object for response to User Authentication.
 * This class encapsulates the JWT token generated during registration or authentication.
 * Additional fields can be added to the response in future.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    /**
     * The JWT token generated after being passed into the builder function.
     */
    private String token;
}
