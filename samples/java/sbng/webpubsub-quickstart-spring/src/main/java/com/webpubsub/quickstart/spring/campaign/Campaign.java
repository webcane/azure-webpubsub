package com.webpubsub.quickstart.spring.campaign;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author mniedre
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Campaign implements Serializable, CampaignResponse {

    private Integer campaignId;

    private String name;
}
