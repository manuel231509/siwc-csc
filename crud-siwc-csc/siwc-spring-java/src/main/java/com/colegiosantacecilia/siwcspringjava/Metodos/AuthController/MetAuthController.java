package com.colegiosantacecilia.siwcspringjava.Metodos.AuthController;

import com.colegiosantacecilia.siwcspringjava.dto.administrator.AdministratorDTO;
import com.colegiosantacecilia.siwcspringjava.dto.session.SessionDTO;
import com.colegiosantacecilia.siwcspringjava.dto.student.StudentDTO;
import com.colegiosantacecilia.siwcspringjava.dto.teacher.TeacherDTO;
import com.colegiosantacecilia.siwcspringjava.services.administrator.AdministratorService;
import com.colegiosantacecilia.siwcspringjava.services.student.StudentService;
import com.colegiosantacecilia.siwcspringjava.services.teacher.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

/**
 *
 * @author Sebastian Villamizar
 *
 */
@Component()
public class MetAuthController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private AdministratorService administratorService;

    public ResponseEntity<?> validateFields(SessionDTO sessionDTO) {

        switch (sessionDTO.getRolName()) {
            case "ROLE_ADMIN":
                // VALIDATION OF THE ADMINISTRATOR ENTITY FIELDS.
                ResponseEntity reValidFieldsAdministrator = validationFieldsAdministrator(
                        sessionDTO.getAdministratorDTO() != null
                        ? sessionDTO.getAdministratorDTO()
                        : sessionDTO.getStudentDTO() != null
                        ? new AdministratorDTO(sessionDTO.getStudentDTO().getIdNumber(),
                                sessionDTO.getStudentDTO().getDocumentType(),
                                sessionDTO.getStudentDTO().getFullNames(),
                                sessionDTO.getStudentDTO().getFullSurNames(),
                                sessionDTO.getStudentDTO().getEmailAddress(),
                                sessionDTO.getStudentDTO().getPhoneNumber())
                        : sessionDTO.getTeacherDTO() != null
                        ? new AdministratorDTO(sessionDTO.getTeacherDTO().getIdNumber(),
                                sessionDTO.getTeacherDTO().getDocumentType(),
                                sessionDTO.getTeacherDTO().getFullNames(),
                                sessionDTO.getTeacherDTO().getFullSurNames(),
                                sessionDTO.getTeacherDTO().getEmailAddress(),
                                sessionDTO.getTeacherDTO().getPhoneNumber())
                        : null
                );
                if (reValidFieldsAdministrator != null) {
                    return reValidFieldsAdministrator;
                }
                break;
            case "ROLE_TEACHER":
                // VALIDATION OF THE TEACHER ENTITY FIELDS.
                ResponseEntity reValidFieldsTeacher = validationFieldsTeacher(
                        sessionDTO.getTeacherDTO() != null
                        ? sessionDTO.getTeacherDTO()
                        : sessionDTO.getStudentDTO() != null
                        ? new TeacherDTO(sessionDTO.getStudentDTO().getIdNumber(),
                                sessionDTO.getStudentDTO().getDocumentType(),
                                sessionDTO.getStudentDTO().getFullNames(),
                                sessionDTO.getStudentDTO().getFullSurNames(),
                                sessionDTO.getStudentDTO().getEmailAddress(),
                                sessionDTO.getStudentDTO().getPhoneNumber())
                        : sessionDTO.getAdministratorDTO() != null
                        ? new TeacherDTO(sessionDTO.getAdministratorDTO().getIdNumber(),
                                sessionDTO.getAdministratorDTO().getDocumentType(),
                                sessionDTO.getAdministratorDTO().getFullNames(),
                                sessionDTO.getAdministratorDTO().getFullSurNames(),
                                sessionDTO.getAdministratorDTO().getEmailAddress(),
                                sessionDTO.getAdministratorDTO().getPhoneNumber())
                        : null
                );

                if (reValidFieldsTeacher != null) {
                    return reValidFieldsTeacher;
                }
                break;
            case "ROLE_STUDENT":
                // VALIDATION OF THE STUDENT ENTITY FIELDS.
                System.out.println("ROLE_STUDENT");
                ResponseEntity reValidFieldsStudent = validationFieldsStudent(
                        sessionDTO.getStudentDTO() != null
                        ? sessionDTO.getStudentDTO()
                        : sessionDTO.getTeacherDTO() != null
                        ? new StudentDTO(sessionDTO.getTeacherDTO().getIdNumber(),
                                sessionDTO.getTeacherDTO().getDocumentType(),
                                sessionDTO.getTeacherDTO().getFullNames(),
                                sessionDTO.getTeacherDTO().getFullSurNames(),
                                sessionDTO.getTeacherDTO().getEmailAddress(),
                                sessionDTO.getTeacherDTO().getPhoneNumber(),
                                sessionDTO.getStudentDTO().getNameDegree())
                        : sessionDTO.getAdministratorDTO() != null
                        ? new StudentDTO(sessionDTO.getAdministratorDTO().getIdNumber(),
                                sessionDTO.getAdministratorDTO().getDocumentType(),
                                sessionDTO.getAdministratorDTO().getFullNames(),
                                sessionDTO.getAdministratorDTO().getFullSurNames(),
                                sessionDTO.getAdministratorDTO().getEmailAddress(),
                                sessionDTO.getAdministratorDTO().getPhoneNumber(),
                                sessionDTO.getStudentDTO().getNameDegree())
                        : null
                );

                if (reValidFieldsStudent != null) {
                    return reValidFieldsStudent;
                }
                break;
        }

        return null;
    }

    public ResponseEntity<?> validationFieldsStudent(StudentDTO studentDTO) {
        ResponseEntity reValidUniqueFieldsStudentsIdNumber = studentService.validationOfUniqueFields(studentDTO);
        ResponseEntity reValidUniqueFieldsStudentsPhoneNumber = studentService.validationOfUniqueFields(studentDTO);
        ResponseEntity reValidUniqueFieldsStudentsEmailAddress = studentService.validationOfUniqueFields(studentDTO);

        return (reValidUniqueFieldsStudentsIdNumber != null)
                ? reValidUniqueFieldsStudentsIdNumber
                : (reValidUniqueFieldsStudentsPhoneNumber != null)
                        ? reValidUniqueFieldsStudentsPhoneNumber
                        : (reValidUniqueFieldsStudentsEmailAddress != null)
                                ? reValidUniqueFieldsStudentsEmailAddress
                                : null;
    }

    public ResponseEntity<?> validationFieldsTeacher(TeacherDTO teacherDTO) {
        ResponseEntity reValidUniqueFieldsTeachersIdNumber = teacherService.validationOfUniqueFields(teacherDTO);
        ResponseEntity reValidUniqueFieldsTeachersPhoneNumber = teacherService.validationOfUniqueFields(teacherDTO);
        ResponseEntity reValidUniqueFieldsTeachersEmailAddress = teacherService.validationOfUniqueFields(teacherDTO);

        return (reValidUniqueFieldsTeachersIdNumber != null)
                ? reValidUniqueFieldsTeachersIdNumber
                : (reValidUniqueFieldsTeachersPhoneNumber != null)
                        ? reValidUniqueFieldsTeachersPhoneNumber
                        : (reValidUniqueFieldsTeachersEmailAddress != null)
                                ? reValidUniqueFieldsTeachersEmailAddress
                                : null;
    }

    public ResponseEntity<?> validationFieldsAdministrator(AdministratorDTO administratorDTO) {
        ResponseEntity reValidUniqueFieldsAdministratorsIdNumber = administratorService.validationOfUniqueFields(administratorDTO);
        ResponseEntity reValidUniqueFieldsAdministratorsPhoneNumber = administratorService.validationOfUniqueFields(administratorDTO);
        ResponseEntity reValidUniqueFieldsAdministratorsEmailAddress = administratorService.validationOfUniqueFields(administratorDTO);

        return (reValidUniqueFieldsAdministratorsIdNumber != null)
                ? reValidUniqueFieldsAdministratorsIdNumber
                : (reValidUniqueFieldsAdministratorsPhoneNumber != null)
                        ? reValidUniqueFieldsAdministratorsPhoneNumber
                        : (reValidUniqueFieldsAdministratorsEmailAddress != null)
                                ? reValidUniqueFieldsAdministratorsEmailAddress
                                : null;
    }
}
