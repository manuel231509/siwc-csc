package com.colegiosantacecilia.siwcspringjava.repositories.taskFile;

import com.colegiosantacecilia.siwcspringjava.commons.GenericRepository;
import com.colegiosantacecilia.siwcspringjava.entities.taskFile.TaskFileEntity;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Sebastian Villamizar
 */
@Repository
public interface TaskFileRepository extends GenericRepository<TaskFileEntity, String>{
    
}
