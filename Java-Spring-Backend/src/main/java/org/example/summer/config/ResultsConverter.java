package org.example.summer.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.example.summer.entity.Results;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Converter(autoApply = true)
public class ResultsConverter implements AttributeConverter<Results, String> {

    private static final Logger logger = LoggerFactory.getLogger(ResultsConverter.class);

    private final static ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Results result) {
        try {
            logger.info("Converting to database column: " + result);
            return objectMapper.writeValueAsString(result);
        } catch (Exception e) {
            logger.warn("Cannot convert Results into JSON");
            throw new RuntimeException("Error converting JsonNode to String", e);
        }
    }

    @Override
    public Results convertToEntityAttribute(String value) {
        try {
            System.out.println("Converting from database column: " + value);
            return objectMapper.readValue(value, Results.class);
        } catch (Exception e) {
            logger.warn("Cannot convert JSON into Results");
            throw new RuntimeException("Error converting String to JsonNode", e);
        }
    }

}