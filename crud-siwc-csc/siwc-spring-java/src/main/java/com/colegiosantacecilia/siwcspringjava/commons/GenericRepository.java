package com.colegiosantacecilia.siwcspringjava.commons;

import org.springframework.data.jpa.repository.JpaRepository;
import java.io.Serializable;
import org.springframework.data.repository.NoRepositoryBean;

/**
 *
 * @author Sebastian Villamizar
 * @param <T>
 * @param <ID>
 *
 */
@NoRepositoryBean
public interface GenericRepository<T, ID extends Serializable> extends JpaRepository<T, ID> {
    
}
