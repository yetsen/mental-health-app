package com.mentalhealth.app.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.AttributeConverter;
import java.util.Map;

public class ResultConverter implements AttributeConverter<Map<String, Double>, String> {

	private final Logger log = LoggerFactory.getLogger(ResultConverter.class);
	private final ObjectMapper objectMapper = new ObjectMapper();

	@Override public String convertToDatabaseColumn (Map<String, Double> stringMap) {
		try {
			return objectMapper.writeValueAsString(stringMap);
		} catch (JsonProcessingException e) {
			log.error("Error While converting to String", e);
		}
		return null;
	}

	@Override public Map<String, Double> convertToEntityAttribute (String s) {
		try {
			TypeReference<Map<String, Double>> typeRef
					= new TypeReference<Map<String, Double>>() {};
			return objectMapper.readValue(s, typeRef);
		} catch (JsonProcessingException e) {
			log.error("Error While converting to Map", e);
		}
		return null;
	}
}
