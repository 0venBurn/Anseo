package org.example.summer.controller;

import lombok.RequiredArgsConstructor;
import org.example.summer.dto.UserResultRequest;
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

    private static final Logger logger = LoggerFactory.getLogger(UserResultController.class);
    private final UserResultService userResultService;

    @GetMapping("/{clerkUserId}")
    public ResponseEntity<List<UserResult>> getUserResults(@PathVariable("clerkUserId") String clerkUserId) {
        return ResponseEntity.ok(userResultService.getAllUserResults(clerkUserId));
    }

    @PostMapping("/{clerkUserId}")
    public ResponseEntity<List<UserResult>> createUserResult(@PathVariable ("clerkUserId") String clerkUserId,
                                                           @RequestBody UserResultRequest userResultRequest) throws Exception {
        logger.info("Create user result: {}", userResultRequest);
        return ResponseEntity.ok(userResultService.saveUserResult(userResultRequest));
    }
}
