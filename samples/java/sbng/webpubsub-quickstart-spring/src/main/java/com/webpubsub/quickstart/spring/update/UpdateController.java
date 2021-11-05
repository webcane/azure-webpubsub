package com.webpubsub.quickstart.spring.update;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.jobrunr.scheduling.JobScheduler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collections;

/**
 * @author mniedre
 */
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UpdateController {

    @Autowired
    private JobScheduler jobScheduler;

    @Autowired
    private UpdateStatusService jobService;

    @PostMapping(path = "/update/start", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> startUpdate(@Valid @RequestBody UpdateRequest newUpdate) {
        log.info("Enqueue an update status job {}", newUpdate);
        jobScheduler.enqueue(() -> jobService.updateStatus(newUpdate.getUserName(), newUpdate.getCampaignId()));
        return ResponseEntity.ok(
                Collections.singletonMap("response", "enqueue an update for campaign #" + newUpdate.getCampaignId()));
    }
}
