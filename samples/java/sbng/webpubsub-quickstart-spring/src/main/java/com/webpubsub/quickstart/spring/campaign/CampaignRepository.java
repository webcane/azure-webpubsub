package com.webpubsub.quickstart.spring.campaign;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

interface SimpleRepository<T> {

    T save(T var);

    List<T> findAll();
}

/**
 * @author mniedre
 */
@Component
public class CampaignRepository implements SimpleRepository<Campaign> {

    private List<Campaign> allCampaigns = new ArrayList<>();

    @Override
    public Campaign save(Campaign var) {
        return allCampaigns.add(var) ? var : null;
    }

    @Override
    public List<Campaign> findAll() {
        return allCampaigns;
    }
}
