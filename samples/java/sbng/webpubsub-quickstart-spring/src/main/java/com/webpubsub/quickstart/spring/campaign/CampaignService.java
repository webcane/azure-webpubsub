package com.webpubsub.quickstart.spring.campaign;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author mniedre
 */
@Slf4j
@Service
public class CampaignService {

    private CampaignRepository repo;

    @Autowired
    public CampaignService(CampaignRepository repository) {
        this.repo = repository;
    }

    public List<Campaign> findAll() {
       return repo.findAll();
    }
}
