package com.colegiosantacecilia.siwcspringjava.repositories.session;

import com.colegiosantacecilia.siwcspringjava.commons.GenericRepository;
import com.colegiosantacecilia.siwcspringjava.entities.session.SessionEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Sebastian Villamizar
 *
 */
@Repository
public interface SessionRepository extends GenericRepository<SessionEntity, String> {

    Optional<SessionEntity> findByUserNameSession(String userNameSession);

    @Query(nativeQuery = true, value = "SELECT function_assign_identification_according_student_teacher_admin(:role_session);")
    Optional<String> functionAssignIdentificationAccordingStudentTeacherAdmin(String role_session);
}
