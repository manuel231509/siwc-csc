package com.colegiosantacecilia.siwcspringjava.services.publishedFile.impl;

import com.colegiosantacecilia.siwcspringjava.commons.GenericServiceImpl;
import com.colegiosantacecilia.siwcspringjava.entities.publishedFile.PublishedFileEntity;
import com.colegiosantacecilia.siwcspringjava.repositories.publishedFile.PublishedFileRepository;

import com.colegiosantacecilia.siwcspringjava.services.publishedFile.PublishedFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author Sebastian Villamizar
 */
@Service
public class PublishedFileServiceImpl extends GenericServiceImpl<PublishedFileEntity, String> implements PublishedFileService {

    @Autowired
    private PublishedFileRepository publishedFileRepository;

    @Override
    public JpaRepository<PublishedFileEntity, String> getJpaRepository() {
        return publishedFileRepository;
    }
}
