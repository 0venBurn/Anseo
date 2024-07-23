package org.example.summer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.summer.entity.Results;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResultRequest {
    private String clerkUserId;
    private Results results;
}
