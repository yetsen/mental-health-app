package com.mentalhealth.app.web.rest;

import com.mentalhealth.app.service.SurveyService;
import com.mentalhealth.app.service.dto.AnswerDTO;
import com.mentalhealth.app.service.dto.SurveyDTO;
import com.mentalhealth.app.service.dto.SurveyResultDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/api/survey")
public class SurveyResource {

    private final SurveyService surveyService;

    public SurveyResource (SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @GetMapping
    //@PreAuthorize ("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<SurveyDTO> get() {
        SurveyDTO surveyDTO = surveyService.getSurveyData();
        return new ResponseEntity<>(surveyDTO, HttpStatus.OK);
    }

    @GetMapping("/answer/{userId}")
    //@PreAuthorize ("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<SurveyResultDTO> getAnswer(@PathVariable Long userId) {
        SurveyResultDTO surveyResultDTO = surveyService.getSurveyAnswers(userId);
        return new ResponseEntity<>(surveyResultDTO, HttpStatus.OK);
    }

    @PostMapping
    @ResponseStatus (HttpStatus.CREATED)
    public void post(@RequestBody List<AnswerDTO> answers) {
        surveyService.putAnswers(answers);
    }

    @PostMapping("/clear/{userId}")
    @ResponseStatus (HttpStatus.OK)
    public void clearAnswers(@PathVariable Long userId) {
        surveyService.clearAnswers(userId);
    }
}
