package com.webpubsub.quickstart.spring.update;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


/**
 * @author mniedre
 */
@Data
@NotNull
public class UpdateRequest {

    @NotNull(message = "Campaign id is mandatory")
    private Integer campaignId;

    @NotBlank(message = "User name is mandatory")
    private String userName;
}
