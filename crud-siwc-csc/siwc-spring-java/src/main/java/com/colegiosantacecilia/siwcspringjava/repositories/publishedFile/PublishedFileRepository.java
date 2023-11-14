package com.colegiosantacecilia.siwcspringjava.repositories.publishedFile;

import com.colegiosantacecilia.siwcspringjava.commons.GenericRepository;
import com.colegiosantacecilia.siwcspringjava.entities.publishedFile.PublishedFileEntity;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Sebastian Villamizar
 */
@Repository
public interface PublishedFileRepository extends GenericRepository<PublishedFileEntity, String> {

}
