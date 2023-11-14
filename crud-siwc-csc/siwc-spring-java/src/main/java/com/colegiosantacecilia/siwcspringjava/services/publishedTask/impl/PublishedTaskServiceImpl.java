package com.colegiosantacecilia.siwcspringjava.services.publishedTask.impl;

import com.colegiosantacecilia.siwcspringjava.commons.GenericServiceImpl;
import com.colegiosantacecilia.siwcspringjava.entities.publishedTask.PublishedTaskEntity;
import com.colegiosantacecilia.siwcspringjava.repositories.publishedTask.PublishedTaskRepository;

import com.colegiosantacecilia.siwcspringjava.services.publishedTask.PublishedTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author Sebastian Villamizar
 */
@Service
public class PublishedTaskServiceImpl extends GenericServiceImpl<PublishedTaskEntity, String> implements PublishedTaskService {

    @Autowired
    private PublishedTaskRepository publishedTaskRepository;

    @Override
    public JpaRepository<PublishedTaskEntity, String> getJpaRepository() {
        return publishedTaskRepository;
    }

}
