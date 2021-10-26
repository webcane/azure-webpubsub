package com.webpubsub.quickstart.spring.update;

import com.azure.messaging.webpubsub.WebPubSubClientBuilder;
import com.azure.messaging.webpubsub.WebPubSubServiceClient;
import com.azure.messaging.webpubsub.models.WebPubSubContentType;
import lombok.extern.slf4j.Slf4j;
import org.jobrunr.jobs.annotations.Job;
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

    @PostConstruct
    public void init() {
        log.debug("Configure Web PubSub client");
        this.client = new WebPubSubClientBuilder()
                .connectionString(connectionString)
                .hub(hubName)
                .buildClient();
    }

    @Job(name = "The update status job")
    public void updateStatus() {
        for (UpdateStatus status : UpdateStatus.values()) {
            log.debug("Send update status: " + status.toString());
            client.sendToAll(status.toString(), WebPubSubContentType.TEXT_PLAIN);
            delay();
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
