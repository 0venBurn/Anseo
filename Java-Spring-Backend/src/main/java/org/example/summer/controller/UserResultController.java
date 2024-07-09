package org.example.summer.controller;

import lombok.RequiredArgsConstructor;
import org.example.summer.entity.UserResult;
import org.example.summer.service.UserResultService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user-results")
@RequiredArgsConstructor
@CrossOrigin
public class UserResultController {

    private static final Logger logger = LoggerFactory.getLogger(WebhookController.class);
    private final UserResultService userResultService;

    @GetMapping("/{clerkUserId}")
    public ResponseEntity<List<UserResult>> getUserResults(@PathVariable("clerkUserId") String clerkUserId) {
        return ResponseEntity.ok(userResultService.getAllUserResults(clerkUserId));
    }

    @PostMapping("/")
    public ResponseEntity<UserResult> createUserResult(@RequestBody UserResult userResult) {
        logger.info("Create user result: {}", userResult);
        return ResponseEntity.ok(userResultService.saveUserResult(userResult));
    }
}
