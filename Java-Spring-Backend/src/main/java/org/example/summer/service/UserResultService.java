package org.example.summer.service;

import lombok.RequiredArgsConstructor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.summer.dao.UserResultRepository;
import org.example.summer.dto.UserResultRequest;
import org.example.summer.dto.UserResultResponse;
import org.example.summer.entity.User;
import org.example.summer.entity.UserResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserResultService {

    private static final Logger logger = LoggerFactory.getLogger(UserResultService.class);

    private final UserResultRepository userResultRepository;
    private final UserService userService;

    public UserResultResponse getAllUserResults(String id) {
        User user = userService.findUserById(id);
        return UserResultResponse.builder()
                .results(userResultRepository.findResultsByIdOrderByTimestamp(user.getClerkUserId()))
                .build();
    }

    public List<UserResult> saveUserResult(UserResultRequest userResultRequest) throws Exception {
        System.out.println("Results type: " + userResultRequest.getResults().getClass().getName());
        System.out.println("Results content: " + userResultRequest.getResults().toString());

        UserResult userResult = UserResult.builder()
                .clerkUserId(userResultRequest.getClerkUserId())
                .results(userResultRequest.getResults())
                .build();

        logger.info("Received selectedBoroughs: " + userResultRequest.getResults());

        userResultRepository.save(userResult);
        return userResultRepository.findResultsByIdOrderByTimestamp(userResultRequest.getClerkUserId());
    }

}
