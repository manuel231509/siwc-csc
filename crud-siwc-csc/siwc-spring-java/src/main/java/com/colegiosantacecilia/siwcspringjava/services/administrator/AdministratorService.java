package com.colegiosantacecilia.siwcspringjava.services.administrator;

import com.colegiosantacecilia.siwcspringjava.commons.GenericService;
import com.colegiosantacecilia.siwcspringjava.dto.administrator.AdministratorDTO;
import com.colegiosantacecilia.siwcspringjava.entities.administrator.AdministratorEntity;
import java.util.Optional;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author Sebastian Villamizar
 */
public interface AdministratorService extends GenericService<AdministratorEntity, Long> {

    Optional<AdministratorEntity> getByIdNumber(Long idNumberAdministrator);

    Optional<AdministratorEntity> getByEmailAddress(String emailAddressAdministrator);

    Optional<AdministratorEntity> getByPhoneNumber(String phoneNumberAdministrator);

    ResponseEntity<?> validationOfUniqueFields(AdministratorDTO administratorDTO);
}
