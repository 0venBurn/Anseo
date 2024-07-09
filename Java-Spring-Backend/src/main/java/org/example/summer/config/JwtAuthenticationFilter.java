//package org.example.summer.config;
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import org.example.summer.entity.User;
//import org.example.summer.service.JwtService;
//import org.example.summer.service.UserService;
//import org.springframework.lang.NonNull;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//
///**
// * JwtAuthenticationFilter checks HTTP requests for a JWT token in the Authorization header
// * and validates the token. If the token is valid, it sets the authentication in the SecurityConfig.
// */
//@Component
//@RequiredArgsConstructor
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//
//    private final JwtService jwtService;
//    private final UserService userService;
//
//    /**
//     * Method to check the HTTP request for the JWT token and validate it.
//     *
//     * @param request the HTTP request.
//     * @param response the HTTP response.
//     * @param filterChain the filter chain.
//     * @throws ServletException if an error occurs during the filtering process.
//     * @throws IOException if an input or output error occurs during the filtering process.
//     */
//    @Override
//    protected void doFilterInternal (
//            @NonNull HttpServletRequest request,
//            @NonNull HttpServletResponse response,
//            @NonNull FilterChain filterChain) throws ServletException, IOException {
//        final String authorizationHeader = request.getHeader("Authorization");
//        final String token;
//        final String username;
//
//        // Header only starts with "Bearer " if there is a token present.
//        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
//            // passes request/response to next filter
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        // Extracts token from authorizationHeader
//        token = authorizationHeader.substring(7);
//        username = jwtService.getUsername(token);
//
//        // If we have user and username not already authenticated
//        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//            User user = this.userService.loadUserByUsername(username);
//
//            // Checking if token is valid for the user
//            if (jwtService.validateToken(token, user)) {
//                // Create a new authenticationToken
//                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
//                        user,
//                        null,
//                        user.getAuthorities()
//                );
//                // Adds details of http request to token
//                authenticationToken.setDetails(
//                        new WebAuthenticationDetailsSource().buildDetails(request)
//                );
//                // Updates security context with token
//                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//            }
//        }
//
//        filterChain.doFilter(request, response);
//    }
//}
