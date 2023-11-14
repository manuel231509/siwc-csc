package com.colegiosantacecilia.siwcspringjava.services.teacher.impl;

import com.colegiosantacecilia.siwcspringjava.commons.GenericServiceImpl;
import com.colegiosantacecilia.siwcspringjava.dto.teacher.TeacherDTO;
import com.colegiosantacecilia.siwcspringjava.entities.teacher.TeacherEntity;
import com.colegiosantacecilia.siwcspringjava.repositories.teacher.TeacherRepository;
import com.colegiosantacecilia.siwcspringjava.services.teacher.TeacherService;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/**
 *
 * @author Sebastian Villamizar
 *
 */
@Service
public class TeacherServiceImpl extends GenericServiceImpl<TeacherEntity, Long> implements TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    @Override
    public Optional<TeacherEntity> getByEmailAddress(String emailAddressTeacher) {
        return teacherRepository.findByEmailAddressTeacher(emailAddressTeacher);
    }

    @Override
    public Optional<TeacherEntity> getByIdNumber(Long idNumberTeacher) {
        return teacherRepository.findByIdNumberTeacher(idNumberTeacher);
    }

    @Override
    public Optional<TeacherEntity> getByPhoneNumber(String phoneNumberTeacher) {
        return teacherRepository.findByPhoneNumberTeacher(phoneNumberTeacher);
    }

    @Override
    public ResponseEntity<?> validationOfUniqueFields(TeacherDTO teacherDTO) {
        return (getByIdNumber(teacherDTO.getIdNumber()).isPresent() && teacherDTO != null)
                ? new ResponseEntity(
                        "{\"message\":\"THE ID NUMBER YOU ARE ENTERING HAS ALREADY BEEN REGISTERED,"
                        + " PLEASE ENTER ANOTHER ID NUMBER.\"}",
                        HttpStatus.BAD_REQUEST)
                : (getByPhoneNumber(teacherDTO.getPhoneNumber()).isPresent() && teacherDTO != null)
                ? new ResponseEntity(
                        "{\"message\":\"THE PHONE NUMBER BEING ENTERED HAS ALREADY BEEN REGISTERED,"
                        + " PLEASE ENTER ANOTHER PHONE NUMBER.\"}",
                        HttpStatus.BAD_REQUEST)
                : (getByEmailAddress(teacherDTO.getEmailAddress()).isPresent() && teacherDTO != null)
                ? new ResponseEntity(
                        "{\"message\":\"THE EMAIL ADDRESS YOU ARE ENTERING HAS ALREADY BEEN REGISTERED,"
                        + " PLEASE ENTER ANOTHER EMAIL ADDRESS.\"}",
                        HttpStatus.BAD_REQUEST)
                : null;
    }

    @Override
    public JpaRepository<TeacherEntity, Long> getJpaRepository() {
        return teacherRepository;
    }
}
