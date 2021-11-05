package com.webpubsub.quickstart.spring.campaign;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

/**
 * @author mniedre
 */
@Slf4j
@Component
public class CampaignInitLoader implements ApplicationListener<ContextRefreshedEvent> {

    private CampaignRepository repo;

    @Autowired
    public CampaignInitLoader(CampaignRepository repo) {
        this.repo = repo;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        log.info("Populate campaigns");
        saveCampaign(repo, getCampaign("campaign 123", 123));
        saveCampaign(repo, getCampaign("campaign 124", 124));
        saveCampaign(repo, getCampaign("campaign 125", 125));
    }

    private static void saveCampaign(CampaignRepository repo, Campaign campaign) {
        Campaign a2 = repo.save(campaign);
        log.info("{} added ", a2);
    }

    private static Campaign getCampaign(String name, Integer id) {
        return new Campaign(id, name);
    }
}
