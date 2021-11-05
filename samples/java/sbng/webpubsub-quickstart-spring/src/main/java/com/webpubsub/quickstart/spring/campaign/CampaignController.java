package com.webpubsub.quickstart.spring.campaign;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author mniedre
 */
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class CampaignController {

    private final CampaignService svc;

    @Autowired
    protected CampaignController(CampaignService service) {
        this.svc = service;
    }


    @GetMapping(path = "/campaigns", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<? extends CampaignResponse>> getCampaigns() {
        log.debug("Requested all campaigns");
        return ResponseEntity.ok(svc.findAll());
    }


}
