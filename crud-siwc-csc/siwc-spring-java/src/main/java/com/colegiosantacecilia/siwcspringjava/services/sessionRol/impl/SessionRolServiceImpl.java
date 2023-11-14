package com.colegiosantacecilia.siwcspringjava.services.sessionRol.impl;

import com.colegiosantacecilia.siwcspringjava.commons.GenericServiceImpl;
import com.colegiosantacecilia.siwcspringjava.entities.sessionRol.SessionRolEntity;
import com.colegiosantacecilia.siwcspringjava.entities.sessionRol.SessionRolPK;
import com.colegiosantacecilia.siwcspringjava.repositories.sessionRol.SessionRolRepository;
import com.colegiosantacecilia.siwcspringjava.services.sessionRol.SessionRolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author Sebastian Villamizar
 */
@Service
public class SessionRolServiceImpl extends GenericServiceImpl<SessionRolEntity, SessionRolPK> implements SessionRolService{
    @Autowired
    private SessionRolRepository sessionRolRepository;

    @Override
    public JpaRepository<SessionRolEntity, SessionRolPK> getJpaRepository() {
        return sessionRolRepository;
    }
}
