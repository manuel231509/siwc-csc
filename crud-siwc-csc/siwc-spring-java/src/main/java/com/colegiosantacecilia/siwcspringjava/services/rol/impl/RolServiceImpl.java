package com.colegiosantacecilia.siwcspringjava.services.rol.impl;

import com.colegiosantacecilia.siwcspringjava.commons.GenericServiceImpl;
import com.colegiosantacecilia.siwcspringjava.entities.rol.RolEntity;
import com.colegiosantacecilia.siwcspringjava.services.rol.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import com.colegiosantacecilia.siwcspringjava.repositories.rol.RolRepository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author Sebastian Villamizar
 */
@Service
public class RolServiceImpl extends GenericServiceImpl<RolEntity, String> implements RolService{
    
    @Autowired
    private RolRepository rolRepository;

    @Override
    public Optional<RolEntity> getNameRole(String nameRole) {
        return rolRepository.findByNameRole(nameRole);
    }

    @Override
    public Optional<String> getIdRole(String nameRole) {
        return rolRepository.functionAssignRoleIdentification(nameRole);
    }
    
    @Override
    public JpaRepository<RolEntity, String> getJpaRepository() {
        return rolRepository;
    }
    
}
