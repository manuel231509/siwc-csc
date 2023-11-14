package com.colegiosantacecilia.siwcspringjava.services.administrator.impl;

import com.colegiosantacecilia.siwcspringjava.commons.GenericServiceImpl;
import com.colegiosantacecilia.siwcspringjava.dto.administrator.AdministratorDTO;
import com.colegiosantacecilia.siwcspringjava.entities.administrator.AdministratorEntity;
import com.colegiosantacecilia.siwcspringjava.repositories.administrator.AdministratorRepository;
import com.colegiosantacecilia.siwcspringjava.services.administrator.AdministratorService;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/**
 *
 * @author Sebastian Villamizar
 */
@Service
public class AdministratorServiceImpl extends GenericServiceImpl<AdministratorEntity, Long> implements AdministratorService {

    @Autowired
    private AdministratorRepository administratorRepository;

    @Override
    public Optional<AdministratorEntity> getByIdNumber(Long idNumberAdministrator) {
        return administratorRepository.findByIdNumberAdministrator(idNumberAdministrator);
    }

    @Override
    public Optional<AdministratorEntity> getByEmailAddress(String emailAddressAdministrator) {
        return administratorRepository.findByEmailAddressAdministrator(emailAddressAdministrator);
    }

    @Override
    public Optional<AdministratorEntity> getByPhoneNumber(String phoneNumberAdministrator) {
        return administratorRepository.findByPhoneNumberAdministrator(phoneNumberAdministrator);
    }

    @Override
    public ResponseEntity<?> validationOfUniqueFields(AdministratorDTO administratorDTO) {
        return (getByIdNumber(administratorDTO.getIdNumber()).isPresent() && administratorDTO != null)
                ? new ResponseEntity(
                        "{\"message\":\"THE ID NUMBER YOU ARE ENTERING HAS ALREADY BEEN REGISTERED,"
                        + " PLEASE ENTER ANOTHER ID NUMBER.\"}",
                        HttpStatus.BAD_REQUEST)
                : (getByPhoneNumber(administratorDTO.getPhoneNumber()).isPresent() && administratorDTO != null)
                ? new ResponseEntity(
                        "{\"message\":\"THE PHONE NUMBER BEING ENTERED HAS ALREADY BEEN REGISTERED,"
                        + " PLEASE ENTER ANOTHER PHONE NUMBER.\"}",
                        HttpStatus.BAD_REQUEST)
                : (getByEmailAddress(administratorDTO.getEmailAddress()).isPresent() && administratorDTO != null)
                ? new ResponseEntity(
                        "{\"message\":\"THE EMAIL ADDRESS YOU ARE ENTERING HAS ALREADY BEEN REGISTERED,"
                        + " PLEASE ENTER ANOTHER EMAIL ADDRESS.\"}",
                        HttpStatus.BAD_REQUEST)
                : null;
    }

    @Override
    public JpaRepository<AdministratorEntity, Long> getJpaRepository() {
        return administratorRepository;
    }

}
