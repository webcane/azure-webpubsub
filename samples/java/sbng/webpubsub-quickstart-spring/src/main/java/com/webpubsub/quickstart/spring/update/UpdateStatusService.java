package com.webpubsub.quickstart.spring.update;

import com.azure.messaging.webpubsub.WebPubSubClientBuilder;
import com.azure.messaging.webpubsub.WebPubSubServiceClient;
import com.azure.messaging.webpubsub.models.WebPubSubContentType;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.jobrunr.jobs.annotations.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.concurrent.TimeUnit;

/**
 * @author mniedre
 */
@Slf4j
@Service
public class UpdateStatusService {

    @Value("${app.pubsub.connection-string}")
    private String connectionString;

    @Value("${app.pubsub.hub-name}")
    private String hubName;

    private WebPubSubServiceClient client;

    @Autowired
    private ObjectMapper mapper;

    @PostConstruct
    public void init() {
        log.debug("Configure Web PubSub client");
        this.client = new WebPubSubClientBuilder()
                .connectionString(connectionString)
                .hub(hubName)
                .buildClient();
    }

    @Job(name = "CampaignResponse %1 update status job")
    public void updateStatus(String userName, Integer campaignId) {
        for (UpdateStatus status : UpdateStatus.values()) {
            log.debug("Send update status {} for campaign {} triggered by {}",
                    status.toString(), campaignId, userName);

            try {
                String json = mapper.writeValueAsString(new UpdateResponse(campaignId, status));
                client.sendToUser(userName, json, WebPubSubContentType.APPLICATION_JSON);
                delay();
            } catch (JsonProcessingException e) {
                log.error(e.getMessage());
            }
        }

    }

    private void delay() {
        // sleep
        try {
            TimeUnit.SECONDS.sleep(1l);
        } catch (InterruptedException ie) {
            Thread.currentThread().interrupt();
        }
    }
}
