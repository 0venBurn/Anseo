//package org.example.summer.controller;
//
//import lombok.RequiredArgsConstructor;
//import org.example.summer.dto.AuthenticationRequest;
//import org.example.summer.dto.AuthenticationResponse;
//import org.example.summer.exception.UserAlreadyExistsException;
//import org.example.summer.service.AuthenticationService;
//import org.example.summer.dto.RegisterRequest;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.web.bind.annotation.*;
//
///**
// * The {@code AuthenticationController} class is a REST controller that handles
// * authentication-related HTTP requests. This controller provides endpoints for
// * user registration and authentication, as well as a test endpoint to verify
// * secured access.
// *
// * <p>The controller uses the {@link AuthenticationService} to perform
// * authentication operations and maps requests to the path "/auth".</p>
// *
// * <p>There are 3 endpoints provided by this controller:</p>
// * <ul>
// *   <li>POST /auth/register: Registers a new user.</li>
// *   <li>POST /auth/authenticate: Authenticates an existing user.</li>
// *   <li>GET /auth/test-auth: A test endpoint to verify secured access.</li>
// * </ul>
// *
// * @see org.example.summer.service.AuthenticationService
// * @see org.example.summer.dto.AuthenticationRequest
// * @see org.example.summer.dto.AuthenticationResponse
// * @see org.example.summer.dto.RegisterRequest
// */
//@RestController
//@RequestMapping("/auth")
//@RequiredArgsConstructor
//@CrossOrigin
//public class AuthenticationController {
//
//    private final AuthenticationService authenticationService;
//
//    /**
//     * Registers a new user.
//     *
//     * @param request the register request containing user registration details.
//     * @return a ResponseEnt    ity with status code 200 containing the authentication response.
//     */
//    @PostMapping("/register")
//    public ResponseEntity<AuthenticationResponse> register(
//            @RequestBody RegisterRequest request
//    ) throws UserAlreadyExistsException {
//        return ResponseEntity.ok(authenticationService.register(request));
//    }
//
//    /**
//     * Authenticates an existing user.
//     *
//     * @param request the authentication request containing user login details.
//     * @return a ResponseEntity with status code 200 containing the authentication response.
//     */
//    @PostMapping("/login")
//    public ResponseEntity<AuthenticationResponse> authenticate(
//            @RequestBody AuthenticationRequest request
//    ) {
//        return ResponseEntity.ok(authenticationService.authenticate(request));
//    }
//
//    /**
//     * A test endpoint to verify only users in the database can access the secured endpoint.
//     *
//     * @return a ResponseEntity with status code 200 containing a greeting message from a secured endpoint.
//     */
//    @GetMapping("/test-auth")
//    public ResponseEntity<String> sayHello() {
//        return ResponseEntity.ok("Hello from secured endpoint");
//    }
//}
