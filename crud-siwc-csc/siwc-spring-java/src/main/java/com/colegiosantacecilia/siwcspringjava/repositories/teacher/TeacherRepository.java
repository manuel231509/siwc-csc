package com.colegiosantacecilia.siwcspringjava.repositories.teacher;

import com.colegiosantacecilia.siwcspringjava.commons.GenericRepository;
import com.colegiosantacecilia.siwcspringjava.entities.teacher.TeacherEntity;
import java.util.Optional;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Sebastian Villamizar
 *
 */
@Repository
public interface TeacherRepository extends GenericRepository<TeacherEntity, Long> {

    Optional<TeacherEntity> findByEmailAddressTeacher(String emailAddressTeacher);

    Optional<TeacherEntity> findByIdNumberTeacher(Long idNumberTeacher);

    Optional<TeacherEntity> findByPhoneNumberTeacher(String phoneNumberTeacher);
}
