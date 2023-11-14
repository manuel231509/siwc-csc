package com.colegiosantacecilia.siwcspringjava.services.student;

import com.colegiosantacecilia.siwcspringjava.entities.student.StudentEntity;
import com.colegiosantacecilia.siwcspringjava.commons.*;
import com.colegiosantacecilia.siwcspringjava.dto.student.StudentDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author Sebastian Villamizar
 *
 */
public interface StudentService extends GenericService<StudentEntity, Long> {

    Optional<StudentEntity> getByEmailAddress(String emailAddressStudent);

    Optional<StudentEntity> getByIdNumberStudent(Long idNumberStudent);

    Optional<StudentEntity> getByPhoneNumberStudent(String phoneNumberStudent);

    ResponseEntity<?> validationOfUniqueFields(StudentDTO searchValue);

    List<StudentEntity> getStudentAccordingDegree(String idDegree);

    List<StudentEntity> getStudentsByDegreeAndTeacherSubejct(String idDegree, String idSubject, Long idNumberTeacher);

    List<StudentEntity> getStudentsByPeriodAndDegreeAndSubjectAndTeacher(
            String idPeriod, String idDegree,
            String idSubject, Long idNumberTeacher);

    List<StudentEntity> getStudentsByTeacherAndTask(Long idNumberTeacher, String idTask);
}
