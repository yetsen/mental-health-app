package com.mentalhealth.app.web.rest;

import com.mentalhealth.app.domain.SurveyInformation;
import com.mentalhealth.app.service.SurveyService;
import com.mentalhealth.app.service.dto.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping ("/api/survey")
public class SurveyResource {

    private final SurveyService surveyService;

    public SurveyResource (SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @GetMapping
    //@PreAuthorize ("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<Map<Long, SurveyDTO>> get() {
        Map<Long, SurveyDTO> surveyDTOs = surveyService.getSurveyData();
        return new ResponseEntity<>(surveyDTOs, HttpStatus.OK);
    }

    @GetMapping("{surveyId}")
    //@PreAuthorize ("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<SurveyDTO> get(@PathVariable Long surveyId) {
        SurveyDTO surveyDTO = surveyService.getSurveyData(surveyId);
        return new ResponseEntity<>(surveyDTO, HttpStatus.OK);
    }

    @GetMapping("/survey-info/{userId}")
    public ResponseEntity<List<SurveyInformation>> getSurveyInformation(@PathVariable Long userId) {
        return new ResponseEntity<>(surveyService.getSurveyInformationByUserId(userId), HttpStatus.OK);
    }

    @GetMapping("/company/survey-info/{companyId}")
    public ResponseEntity<Map<Integer, List<SurveyInformation>>> getCompanySurveyInformation(@PathVariable Long companyId) {
        return new ResponseEntity<>(surveyService.getCompanySurveyInformationByCompanyId(companyId), HttpStatus.OK);
    }

    @GetMapping("/answer/{userId}/{times}/{surveyId}")
    //@PreAuthorize ("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<SurveyResultDTO> getAnswer(@PathVariable Long userId, @PathVariable Integer times, @PathVariable Long surveyId) {
        SurveyResultDTO surveyResultDTO = surveyService.getSurveyAnswers(userId, times, surveyId);
        return new ResponseEntity<>(surveyResultDTO, HttpStatus.OK);
    }

    @PostMapping
    @ResponseStatus (HttpStatus.CREATED)
    public void post(@RequestBody AnswersDTO answers) {
        surveyService.putAnswers(answers);
    }

    @PostMapping("/clear/{userId}/{times}/{surveyId}")
    @ResponseStatus (HttpStatus.OK)
    public void clearAnswers(@PathVariable Long userId, @PathVariable Integer times, @PathVariable Long surveyId) {
        surveyService.clearAnswers(userId, times, surveyId);
    }
}
