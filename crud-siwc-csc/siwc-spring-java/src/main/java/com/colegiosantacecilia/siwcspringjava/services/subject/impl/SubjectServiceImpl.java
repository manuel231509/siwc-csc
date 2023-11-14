package com.colegiosantacecilia.siwcspringjava.services.subject.impl;

import com.colegiosantacecilia.siwcspringjava.commons.GenericServiceImpl;
import com.colegiosantacecilia.siwcspringjava.entities.subject.SubjectEntity;
import com.colegiosantacecilia.siwcspringjava.repositories.subject.SubjectRepository;
import com.colegiosantacecilia.siwcspringjava.services.subject.SubjectService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author Sebastian Villamizar
 */
@Service
public class SubjectServiceImpl extends GenericServiceImpl<SubjectEntity, String> implements SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    @Override
    public Optional<SubjectEntity> getNameSubject(String nameSubject) {
        return subjectRepository.findByNameSubject(nameSubject);
    }

    @Override
    public List<SubjectEntity> getSubjectsByIdNumberTeacherAndIdDegree(Long idNumberTeacher, String idDegree) {
        return subjectRepository.findSubjectByIdNumberTeacherAndIdDegree(idNumberTeacher, idDegree);
    }

    @Override
    public List<SubjectEntity> getSubjectsByIdDegreeStudent(String idDegree) {
        return subjectRepository.findSubjectsByIdDegreeStudent(idDegree);
    }

    @Override
    public List<SubjectEntity> getSubjectsByIdNumberStudent(Long idNumberStudent) {
        return subjectRepository.getSubjectsByIdStudent(idNumberStudent);
    }
    
    @Override
    public JpaRepository<SubjectEntity, String> getJpaRepository() {
        return subjectRepository;
    }
}
