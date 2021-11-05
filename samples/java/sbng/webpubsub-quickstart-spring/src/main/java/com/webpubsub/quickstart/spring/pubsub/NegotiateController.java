package com.webpubsub.quickstart.spring.pubsub;

import com.azure.messaging.webpubsub.WebPubSubClientBuilder;
import com.azure.messaging.webpubsub.WebPubSubServiceClient;
import com.azure.messaging.webpubsub.models.GetAuthenticationTokenOptions;
import com.azure.messaging.webpubsub.models.WebPubSubAuthenticationToken;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Collections;

/**
 * @author mniedre
 */
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class NegotiateController {

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

    @GetMapping(path = "/negotiate", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> negotiate(@NotBlank(message = "missing user id")
                                           @Size(max = 120)
                                           @RequestParam(value = "id") String userName) {
        log.info("Handle the negotiate request and return the token to the client: {}", userName);

        GetAuthenticationTokenOptions option = new GetAuthenticationTokenOptions();
        option.setUserId(userName);
        WebPubSubAuthenticationToken token = client.getAuthenticationToken(option);
        return ResponseEntity.ok(Collections.singletonMap("token", token.getUrl()));
    }


}
