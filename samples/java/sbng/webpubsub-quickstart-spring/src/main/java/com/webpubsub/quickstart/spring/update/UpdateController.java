package com.webpubsub.quickstart.spring.update;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.jobrunr.scheduling.JobScheduler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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

//    @PostMapping("/update")
//    public ResponseEntity<?> startUpdate(@RequestBody UpdateRequest newUpdate) {
//        if(newUpdate.getId() % 2 == 0) {
//            // enqueue the update status job
//            jobScheduler.enqueue(() -> jobService.updateStatus());
//
//            return ResponseEntity.ok(newUpdate);
//        }
//        return ResponseEntity
//                .status(HttpStatus.BAD_REQUEST)
//                .body("Unable to execute the start update request. id " + newUpdate.getId());
//    }

    @GetMapping(path = "/update/start", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> startUpdate() {
        log.info("Enqueue an update status job");
        jobScheduler.enqueue(() -> jobService.updateStatus());
        return ResponseEntity.ok(
                Collections.singletonMap("response", "enqueue an update"));
    }

}
