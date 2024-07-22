package org.example.summer.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.svix.Webhook;
import lombok.RequiredArgsConstructor;
import org.example.summer.entity.User;
import org.example.summer.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.http.HttpHeaders;
import java.util.*;
import java.util.function.BiPredicate;

import static java.util.Collections.singletonList;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class WebhookController {

  private static final Logger logger = LoggerFactory.getLogger(WebhookController.class);
  private final ObjectMapper objectMapper;

  private final UserService userService;

  @Value("${client.webhook.secret-key}")
  private String secretKey;

  @Value("${user.service.url}")
  private String userServiceUrl;

  @PostMapping("/webhook")
  public ResponseEntity<?> handleWebhook(
      @RequestHeader("Svix-Id") String svixId,
      @RequestHeader("Svix-Signature") String svixSignature,
      @RequestHeader("Svix-Timestamp") String svixTimestamp,
      @RequestBody String payload) {

    logger.info("Received headers: " + svixId + ", " + svixSignature + ", " + svixTimestamp + ", " + payload );
    logger.info("Received raw payload: " + payload);

    try {
      HashMap<String, List<String>> headerMap = new HashMap<String, List<String>>();
      headerMap.put("svix-id", singletonList(svixId));
      headerMap.put("svix-timestamp", singletonList(svixTimestamp));
      headerMap.put("svix-signature", singletonList(svixSignature));

      BiPredicate<String, String> filter = (key, value) -> true;

      HttpHeaders headers = HttpHeaders.of(headerMap, filter);

      Webhook webhook = new Webhook(secretKey);
      webhook.verify(payload, headers);

      JsonNode jsonNode = objectMapper.readTree(payload);
      logger.info(jsonNode.toString());

      String eventType = jsonNode.path("type").asText();

      logger.info("Event type: " + eventType);
      if (eventType.equals("user.created")) {
        String userId = jsonNode.path("data").path("id").asText();
        logger.info("User id: " + userId);

        User user = new User(userId);
        logger.info("User: " + user);
        userService.saveUser(user);

        URI location = URI.create(userServiceUrl + "/users/" + userId);

        return ResponseEntity.created(location).body("User Created: " + userId);
      }
      if (eventType.equals("user.deleted")) {
        String userId = jsonNode.path("data").path("id").asText();
        User user = userService.findUserById(userId);
        userService.deleteUser(user);
        return ResponseEntity.noContent().build();
      }
      return ResponseEntity.ok("Webhook received");
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }
}
