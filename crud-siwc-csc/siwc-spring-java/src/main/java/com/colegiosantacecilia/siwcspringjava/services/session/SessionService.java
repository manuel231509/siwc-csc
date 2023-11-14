package com.colegiosantacecilia.siwcspringjava.services.session;

import com.colegiosantacecilia.siwcspringjava.commons.GenericService;
import com.colegiosantacecilia.siwcspringjava.entities.session.SessionEntity;
import java.util.Optional;

/**
 *
 * @author Sebastian Villamizar
 *
 */
public interface SessionService extends GenericService<SessionEntity, String> {

    Optional<SessionEntity> getUserNameSession(String userNameSession);

    String encryptPassword(String password);

    /**
     *
     * @param originalPassword
     * @param hashPassword
     * @return
     */
    Boolean verifyPassword(String originalPassword, String hashPassword);

    /**
     *
     * @param role_admin
     * @return
     */
    Optional<String> getIdStudentTeacherAdmin(String role_admin);
}
