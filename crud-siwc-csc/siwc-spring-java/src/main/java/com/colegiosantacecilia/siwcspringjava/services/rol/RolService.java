package com.colegiosantacecilia.siwcspringjava.services.rol;

import com.colegiosantacecilia.siwcspringjava.commons.GenericService;
import com.colegiosantacecilia.siwcspringjava.entities.rol.RolEntity;
import java.util.Optional;

/**
 *
 * @author Sebastian Villamizar
 */
public interface RolService extends GenericService<RolEntity, String> {

    /**
     *
     * @param nameRole
     * @return
     */
    Optional<RolEntity> getNameRole(String nameRole);
    
    /**
     *
     * @param nameRole
     * @return
     */
    Optional<String> getIdRole(String nameRole);
}
