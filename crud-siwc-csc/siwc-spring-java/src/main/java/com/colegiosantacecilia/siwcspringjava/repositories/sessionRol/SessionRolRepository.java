package com.colegiosantacecilia.siwcspringjava.repositories.sessionRol;

import com.colegiosantacecilia.siwcspringjava.commons.GenericRepository;
import com.colegiosantacecilia.siwcspringjava.entities.sessionRol.SessionRolEntity;
import com.colegiosantacecilia.siwcspringjava.entities.sessionRol.SessionRolPK;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Sebastian Villamizar
 */
@Repository
public interface SessionRolRepository extends GenericRepository<SessionRolEntity, SessionRolPK>{
    
}
