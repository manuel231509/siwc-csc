package com.colegiosantacecilia.siwcspringjava.services.subject;

import com.colegiosantacecilia.siwcspringjava.commons.GenericService;
import com.colegiosantacecilia.siwcspringjava.entities.subject.SubjectEntity;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author Sebastian Villamizar
 */
public interface SubjectService extends GenericService<SubjectEntity, String>{
    Optional<SubjectEntity> getNameSubject(String nameSubject);
    
    List<SubjectEntity> getSubjectsByIdNumberTeacherAndIdDegree(Long idNumberTeacher, String idDegree);
    
    List<SubjectEntity>  getSubjectsByIdDegreeStudent(String idDegree);
    
    List<SubjectEntity> getSubjectsByIdNumberStudent(Long idNumberStudent);
}
