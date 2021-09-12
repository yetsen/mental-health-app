package com.mentalhealth.app.web.rest;

import com.mentalhealth.app.service.ChartService;
import com.mentalhealth.app.service.dto.ChartDTO;
import io.swagger.models.auth.In;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping ("/api/chart")
public class ChartResource {

    private final ChartService chartService;

    public ChartResource (ChartService chartService) {

        this.chartService = chartService;
    }

    @GetMapping("/formula-results/{userId}")
    public ResponseEntity<Map<String, Map<Integer, Double>>> getFormulaResults(@PathVariable Long userId) {
        Map<String, Map<Integer, Double>> results = chartService.getAllFormulaResults(userId);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    @GetMapping("/company-formula-results/{companyId}")
    public ResponseEntity<List<Map<String, Map<Integer, Double>>>> getCompanyFormulaResults(@PathVariable Long companyId) {
        List<Map<String, Map<Integer, Double>>> results = chartService.getAllCompanyFormulaResults(companyId);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }
}
