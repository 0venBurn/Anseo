package org.example.summer.service;

import lombok.RequiredArgsConstructor;
import org.example.summer.dao.UserResultRepository;
import org.example.summer.entity.User;
import org.example.summer.entity.UserResult;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserResultService {

    private final UserResultRepository userResultRepository;
    private final UserService userService;

    public List<UserResult> getAllUserResults(String id) {
        User user = userService.findUserById(id);
        return userResultRepository.findResultsByIdOrderByTimestamp(user.getClerkUserId());
    }

    public UserResult saveUserResult(UserResult userResult) {
        return userResultRepository.save(userResult);
    }

}
