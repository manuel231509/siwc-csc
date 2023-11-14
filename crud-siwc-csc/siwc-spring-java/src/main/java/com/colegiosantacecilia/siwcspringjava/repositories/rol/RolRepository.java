package com.colegiosantacecilia.siwcspringjava.repositories.rol;

import com.colegiosantacecilia.siwcspringjava.commons.GenericRepository;
import com.colegiosantacecilia.siwcspringjava.entities.rol.RolEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Sebastian Villamizar
 */
@Repository
public interface RolRepository extends GenericRepository<RolEntity, String> {

    /**
     *
     * @param nameRole
     * @return
     */
    Optional<RolEntity> findByNameRole(String nameRole);
    
    @Query(nativeQuery = true, value = "SELECT function_assign_role_identification(:name_role);")
    Optional<String> functionAssignRoleIdentification(String name_role);
}
