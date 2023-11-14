package com.colegiosantacecilia.siwcspringjava.services.taskFile.impl;

import com.colegiosantacecilia.siwcspringjava.commons.GenericServiceImpl;
import com.colegiosantacecilia.siwcspringjava.entities.taskFile.TaskFileEntity;
import com.colegiosantacecilia.siwcspringjava.repositories.taskFile.TaskFileRepository;

import com.colegiosantacecilia.siwcspringjava.services.taskFile.TaskFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author Sebastian Villamizar
 */
@Service
public class TaskFileServiceImpl extends GenericServiceImpl<TaskFileEntity, String> implements TaskFileService {

    @Autowired
    private TaskFileRepository taskFileRepository;

    @Override
    public JpaRepository<TaskFileEntity, String> getJpaRepository() {
        return taskFileRepository;
    }

}
