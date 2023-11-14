package com.colegiosantacecilia.siwcspringjava.services.student.impl;

import com.colegiosantacecilia.siwcspringjava.services.student.StudentService;
import com.colegiosantacecilia.siwcspringjava.entities.student.StudentEntity;
import com.colegiosantacecilia.siwcspringjava.commons.*;
import com.colegiosantacecilia.siwcspringjava.dto.student.StudentDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import com.colegiosantacecilia.siwcspringjava.repositories.student.StudentRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/**
 *
 * @author Sebastian Villamizar
 *
 */
@Service
public class StudentServiceImpl extends GenericServiceImpl<StudentEntity, Long> implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Optional<StudentEntity> getByEmailAddress(String emailAddressStudent) {
        return studentRepository.findByEmailAddressStudent(emailAddressStudent);
    }

    @Override
    public Optional<StudentEntity> getByIdNumberStudent(Long idNumberStudent) {
        return studentRepository.findByIdNumberStudent(idNumberStudent);
    }

    @Override
    public Optional<StudentEntity> getByPhoneNumberStudent(String phoneNumberStudent) {
        return studentRepository.findByPhoneNumberStudent(phoneNumberStudent);
    }

    @Override
    public ResponseEntity<?> validationOfUniqueFields(StudentDTO studentDTO) {
        return (getByIdNumberStudent(studentDTO.getIdNumber()).isPresent() && studentDTO != null)
                ? new ResponseEntity(
                        "{\"message\":\"THE ID NUMBER YOU ARE ENTERING HAS ALREADY BEEN REGISTERED,"
                        + " PLEASE ENTER ANOTHER ID NUMBER.\"}",
                        HttpStatus.BAD_REQUEST)
                : (getByPhoneNumberStudent(studentDTO.getPhoneNumber()).isPresent() && studentDTO != null)
                ? new ResponseEntity(
                        "{\"message\":\"THE PHONE NUMBER BEING ENTERED HAS ALREADY BEEN REGISTERED,"
                        + " PLEASE ENTER ANOTHER PHONE NUMBER.\"}",
                        HttpStatus.BAD_REQUEST)
                : (getByEmailAddress(studentDTO.getEmailAddress()).isPresent() && studentDTO != null)
                ? new ResponseEntity(
                        "{\"message\":\"THE EMAIL ADDRESS YOU ARE ENTERING HAS ALREADY BEEN REGISTERED,"
                        + " PLEASE ENTER ANOTHER EMAIL ADDRESS.\"}",
                        HttpStatus.BAD_REQUEST)
                : null;
    }

    @Override
    public List<StudentEntity> getStudentsByTeacherAndTask(Long idNumberTeacher, String idTask) {
        return studentRepository.findStudentsByTeacherAndTask(idNumberTeacher, idTask);
    }

    @Override
    public List<StudentEntity> getStudentAccordingDegree(String idDegree) {
        return studentRepository.findByIdDegree(idDegree);
    }

    @Override
    public List<StudentEntity> getStudentsByDegreeAndTeacherSubejct(String idDegree, String idSubject, Long idNumberTeacher) {
        return studentRepository.findStudentsByTeacherAndDegreeAndSubject(idDegree, idSubject, idNumberTeacher);
    }
    
    @Override
    public List<StudentEntity> getStudentsByPeriodAndDegreeAndSubjectAndTeacher(
            String idPeriod,String idDegree, String idSubject, Long idNumberTeacher) {
        return studentRepository.findStudentsByPeriodAndDegreeAndSubjectAndTeacher(idPeriod, idDegree, idSubject, idNumberTeacher);
    }

    @Override
    public JpaRepository<StudentEntity, Long> getJpaRepository() {
        return studentRepository;
    }
}
