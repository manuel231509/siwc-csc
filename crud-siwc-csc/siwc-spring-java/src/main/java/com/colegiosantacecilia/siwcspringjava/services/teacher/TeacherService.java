package com.colegiosantacecilia.siwcspringjava.services.teacher;

import com.colegiosantacecilia.siwcspringjava.commons.GenericService;
import com.colegiosantacecilia.siwcspringjava.dto.teacher.TeacherDTO;
import com.colegiosantacecilia.siwcspringjava.entities.teacher.TeacherEntity;
import java.util.Optional;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author Sebastian Villamizar
 *
 */
public interface TeacherService extends GenericService<TeacherEntity, Long> {

    Optional<TeacherEntity> getByEmailAddress(String emailAddressTeacher);

    Optional<TeacherEntity> getByIdNumber(Long idNumberTeacher);

    Optional<TeacherEntity> getByPhoneNumber(String phoneNumberTeacher);

    ResponseEntity<?> validationOfUniqueFields(TeacherDTO teacherDTO);
}
