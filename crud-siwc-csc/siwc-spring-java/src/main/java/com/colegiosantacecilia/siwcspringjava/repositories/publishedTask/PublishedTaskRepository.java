package com.colegiosantacecilia.siwcspringjava.repositories.publishedTask;

import com.colegiosantacecilia.siwcspringjava.commons.GenericRepository;
import com.colegiosantacecilia.siwcspringjava.entities.publishedTask.PublishedTaskEntity;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Sebastian Villamizar
 */
@Repository
public interface PublishedTaskRepository extends GenericRepository<PublishedTaskEntity, String> {
    
}
