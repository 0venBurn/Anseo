    package org.example.summer.exception;

    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.security.authentication.BadCredentialsException;
    import org.springframework.security.core.AuthenticationException;
    import org.springframework.security.core.userdetails.UsernameNotFoundException;
    import org.springframework.web.bind.annotation.*;
    import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

    @RestControllerAdvice
    public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

        @ExceptionHandler(AuthenticationException.class)
        @ResponseBody
        public ResponseEntity<String> handleAuthenticationException(Exception ex) {
            return new ResponseEntity<>(ex.getMessage() + ": incorrect password", HttpStatus.UNAUTHORIZED);
        }

        @ExceptionHandler(UsernameNotFoundException.class)
        @ResponseStatus(HttpStatus.NOT_FOUND)
        public ResponseEntity<String> usernameNotFound(UsernameNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

//        @ExceptionHandler(UserAlreadyExistsException.class)
//        @ResponseStatus(HttpStatus)
    }

