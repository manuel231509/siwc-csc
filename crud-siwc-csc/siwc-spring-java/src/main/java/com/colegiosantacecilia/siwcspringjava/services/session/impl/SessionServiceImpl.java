package com.colegiosantacecilia.siwcspringjava.services.session.impl;

import com.colegiosantacecilia.siwcspringjava.commons.GenericServiceImpl;
import com.colegiosantacecilia.siwcspringjava.entities.session.SessionEntity;
import com.colegiosantacecilia.siwcspringjava.repositories.session.SessionRepository;
import com.colegiosantacecilia.siwcspringjava.services.session.SessionService;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

/**
 *
 * @author Sebastian Villamizar
 *
 */
@Service
public class SessionServiceImpl extends GenericServiceImpl<SessionEntity, String> implements SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    @Override
    public Optional<SessionEntity> getUserNameSession(String userNameSession) {
        return sessionRepository.findByUserNameSession(userNameSession);
    }

    @Override
    public Optional<String> getIdStudentTeacherAdmin(String role_admin) {
        return sessionRepository.functionAssignIdentificationAccordingStudentTeacherAdmin(role_admin);
    }

    @Override
    public String encryptPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    @Override
    public Boolean verifyPassword(String originalPassword, String hashPassword) {
        return BCrypt.checkpw(originalPassword, hashPassword);
    }

    @Override
    public JpaRepository<SessionEntity, String> getJpaRepository() {
        return sessionRepository;
    }
}
