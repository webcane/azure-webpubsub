package com.webpubsub.quickstart.spring.update;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * @author mniedre
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateResponse {

    @NotNull(message = "Campaign id is mandatory")
    private Integer campaignId;

    @NotNull(message = "Update status is mandatory")
    private UpdateStatus updateStatus;
}
