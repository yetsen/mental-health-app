package com.mentalhealth.app.service.dto;

import com.mentalhealth.app.domain.Block;
import lombok.Data;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class SurveyDTO {

    private String title;
    private String showProgressBar;
    private List<PageDTO> pages;

    public SurveyDTO (List<Block> blocks) {
        this.title = "Circular Economy Assessment";
        this.showProgressBar = "top";
        this.pages = blocks.stream()
            .sorted(Comparator.comparing(Block::getId))
            .map(PageDTO::new)
            .collect(Collectors.toList());
    }
}
