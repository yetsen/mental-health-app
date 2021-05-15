package com.mentalhealth.app.web.rest;

import com.mentalhealth.app.service.ChartService;
import com.mentalhealth.app.service.dto.ChartDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/api/chart")
public class ChartResource {

    private final ChartService chartService;

    public ChartResource (ChartService chartService) {

        this.chartService = chartService;
    }

    @GetMapping("/{userId}")
    //@PreAuthorize ("hasAuthority(\"" + AuthoritiesConstants.USER + "\")")
    public ResponseEntity<List<ChartDTO>> get(@PathVariable Long userId) {
        List<ChartDTO> chartDTOs = chartService.generateCharts(userId);
        return new ResponseEntity<>(chartDTOs, HttpStatus.OK);
    }
}
