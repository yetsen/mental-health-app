package com.mentalhealth.app.service.dto;

import com.mentalhealth.app.domain.Block;
import com.mentalhealth.app.domain.Question;
import lombok.Data;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Data
public class PageDTO {

    private Long id;
    private String name;
    private String title;
    private String description;
    private Long chartId;
    private List<ElementDTO> elements;

    public PageDTO (Block block) {
        this.id = block.getId();
        this.name = block.getName();
        this.title = ""; //Invisible Page Title
        this.description = block.getDescription();
        if (block.getChart() != null)
            this.chartId = block.getChart().getId();
        this.elements = block.getQuestions().stream()
            .sorted(Comparator.comparing(Question::getId))
            .map(ElementDTO::new).collect(Collectors.toList());

    }
}
