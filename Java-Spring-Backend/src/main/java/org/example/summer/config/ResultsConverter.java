package org.example.summer.config;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class JsonConverter implements AttributeConverter<JsonNode, String> {

    private final static ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(JsonNode attribute) {
        try {
            String result = objectMapper.writeValueAsString(attribute);
            System.out.println("Converting to database column: " + result);
            return result;
        } catch (Exception e) {
            throw new RuntimeException("Error converting JsonNode to String", e);
        }
    }

    @Override
    public JsonNode convertToEntityAttribute(String dbData) {
        try {
            System.out.println("Converting from database column: " + dbData);
            return objectMapper.readTree(dbData);
        } catch (Exception e) {
            throw new RuntimeException("Error converting String to JsonNode", e);
        }
    }

}