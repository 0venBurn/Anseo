//    package org.example.summer.service;
//
//    import io.jsonwebtoken.Claims;
//    import io.jsonwebtoken.Jwts;
//    import io.jsonwebtoken.io.Decoders;
//    import io.jsonwebtoken.security.Keys;
//    import org.example.summer.entity.User;
//    import org.springframework.beans.factory.annotation.Value;
//    import org.springframework.stereotype.Service;
//
//    import javax.crypto.SecretKey;
//    import java.util.Date;
//    import java.util.HashMap;
//    import java.util.Map;
//    import java.util.function.Function;
//
//    /**
//     * Service class for managing JSON Web Tokens (JWT).
//     */
//    @Service
//    public class JwtService {
//
//        @Value("${jwt.public.key.path}")
//        private String publicKeyPath;
//
//        @Value("${jwt.secret.key}")
//        private String secretKey;
//
//        /**
//         * Retrieves the username (email) from a JWT.
//         *
//         * @param token the JWT used to extract the username.
//         * @return the username from within the JWT.
//         */
//        public String getUsername(String token) {
//            return getClaim(token, Claims::getSubject);
//        }
//
//        /**
//         * Retrieves a claim (information about the user) from a JWT.
//         *
//         * @param token the JWT used to retrieve the claim.
//         * @param claimsResolver a function to resolve the claim.
//         * @return the specific claim from the JWT.
//         */
//        private <T> T getClaim(String token, Function<Claims, T> claimsResolver) {
//            final Claims claims = getAllClaims(token);
//            return claimsResolver.apply(claims);
//        }
//
//        public Date getExpiration(String token) {
//            return getClaim(token, Claims::getExpiration);
//        }
//
//        /**
//         * Generates a JWT for the user passed in with no additional claims.
//         *
//         * @param user contains the userDetails to generate the JWT.
//         * @return the generated JWT.
//         */
//        public String generateToken(User user) {
//            return generateToken(new HashMap<>(), user);
//        }
//
//        /**
//         * Generates a JWT for the user with additional claims also passed in.
//         *
//         * @param claims additional claims included for the JWT generation.
//         * @param user contains the userDetails to generate the JWT.
//         * @return the generated JWT.
//         */
//        public String generateToken(
//                Map<String, Object> claims,
//                User user
//        ) {
//            return Jwts
//                    .builder()
//                    .claims(claims)
//                    .subject(user.getUsername())
//                    .issuedAt(new Date(System.currentTimeMillis()))
//                    .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
//                    .signWith(getSignInKey())
//                    .compact(); // this generates and returns the token.
//        }
//
//        /**
//         * Validates the JWT for the User provided.
//         *
//         * @param token the token to be validated.
//         * @param user the User Entity to be checked with the token.
//         * @return true if the token is valid for the user and false if not.
//         */
//        public boolean validateToken(String token, User user) {
//            final String username = getUsername(token);
//            return (username.equals(user.getUsername())) && !isTokenExpired(token);
//        }
//
//        /**
//         * Checks if the JWT has expired.
//         *
//         * @param token the token to be checked.
//         * @return true if the token has expired and false if not.
//         */
//        private boolean isTokenExpired(String token) {
//            // check if before today's date
//            return getExpiration(token).before(new Date());
//        }
//
//        /**
//         * Retrieves all claims (user details) from a JWT.
//         *
//         * @param token the JWT used to retrieve the claims  from the payload.
//         * @return the claims retrieved from the JWT.
//         */
//        public Claims getAllClaims(String token) {
//            return Jwts
//                    .parser()
//                    .verifyWith(getSignInKey())
//                    .build()
//                    .parseSignedClaims(token)
//                    .getPayload();
//        }
//
//        /**
//         * Retrieves the secret key for the JWT signature.
//         *
//         * @return the secret key.
//         */
//        private SecretKey getSignInKey() {
//            byte[] keyBytes = Decoders.BASE64.decode(secretKey);
//            return Keys.hmacShaKeyFor(keyBytes);
//        }
//    }
