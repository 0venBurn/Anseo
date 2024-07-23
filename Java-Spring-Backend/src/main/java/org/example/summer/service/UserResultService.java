package org.example.summer.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.summer.dao.UserResultRepository;
import org.example.summer.dto.UserResultRequest;
import org.example.summer.dto.UserResultResponse;
import org.example.summer.dto.UserResultResponseData;
import org.example.summer.entity.User;
import org.example.summer.entity.UserResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserResultService {

    private static final Logger logger = LoggerFactory.getLogger(UserResultService.class);

    private final ObjectMapper objectMapper = new ObjectMapper();

    private final UserResultRepository userResultRepository;
    private final UserService userService;

    public UserResultResponse getAllUserResults(String id) {
        User user = userService.findUserById(id);
        List<UserResult> userResults = userResultRepository.findResultsByIdOrderByTimestamp(user.getClerkUserId());

        List<UserResultResponseData> convertedResults = userResults.stream()
                .map(this::convertToUserResultResponse)
                .collect(Collectors.toList());

        return UserResultResponse.builder()
                .results(convertedResults)
                .build();
    }

    private UserResultResponseData convertToUserResultResponse(UserResult userResult){
        try {
            return UserResultResponseData.builder()
                    .resultId(userResult.getResultId())
                    .clerkUserId(userResult.getClerkUserId())
                    .predictions(objectMapper.readValue(userResult.getPredictions(), new TypeReference<Map<String, Double>>() {}))
                    .selectedBoroughs(objectMapper.readValue(userResult.getSelectedBoroughs(), new TypeReference<List<String>>() {}))
                    .topNeighbourhoodName(userResult.getTopNeighbourhoodName())
                    .topNeighbourhoodRating(userResult.getTopNeighbourhoodRating())
                    .timestamp(userResult.getTimestamp())
                    .build();
        } catch (JsonProcessingException e) {
            logger.error(e.getMessage());
            return null;
        }
    }

    public List<UserResult> saveUserResult(UserResultRequest userResultRequest) throws Exception {
        UserResult userResult = UserResult.builder()
                .clerkUserId(userResultRequest.getClerkUserId())
                .predictions(objectMapper.writeValueAsString(userResultRequest.getPredictions()))
                .selectedBoroughs(objectMapper.writeValueAsString(userResultRequest.getSelectedBoroughs()))
                .topNeighbourhoodName(userResultRequest.getTopNeighbourhoodName())
                .topNeighbourhoodRating(userResultRequest.getTopNeighbourhoodRating())
                .build();

        userResultRepository.save(userResult);
        return userResultRepository.findResultsByIdOrderByTimestamp(userResultRequest.getClerkUserId());
    }

}
