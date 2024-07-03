package org.example.summer.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
// extends responsible for successful authentication and it has
// methods which trigger once authentication is successful
public class OAuth2SuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    @Value("${frontend.url}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        this.setAlwaysUseDefaultTargetUrl(true);
        // after login will redirect to home page - change to map later
        this.setDefaultTargetUrl(frontendUrl + "/signedin");
        super.onAuthenticationSuccess(request, response, chain, authentication);
    }
}
