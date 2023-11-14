package com.colegiosantacecilia.siwcspringjava.repositories.administrator;

import com.colegiosantacecilia.siwcspringjava.commons.GenericRepository;
import com.colegiosantacecilia.siwcspringjava.entities.administrator.AdministratorEntity;
import java.util.Optional;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Sebastian Villamizar
 */
@Repository
public interface AdministratorRepository extends GenericRepository<AdministratorEntity, Long> {

    Optional<AdministratorEntity> findByIdNumberAdministrator(Long idNumberAdministrator);

    Optional<AdministratorEntity> findByEmailAddressAdministrator(String emailAddressAdministrator);

    Optional<AdministratorEntity> findByPhoneNumberAdministrator(String phoneNumberAdministrator);
}
