package com.colegiosantacecilia.siwcspringjava.services.degreeSubject.impl;

import com.colegiosantacecilia.siwcspringjava.commons.GenericServiceImpl;
import com.colegiosantacecilia.siwcspringjava.entities.degreeSubject.DegreeSubjectEntity;
import com.colegiosantacecilia.siwcspringjava.repositories.degreeSubject.DegreeSubjectRepository;

import com.colegiosantacecilia.siwcspringjava.services.degreeSubject.DegreeSubjectService;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

/**
 *
 * @author Sebastian Villamizar
 */
@Service
public class DegreeSubjectServiceImpl extends GenericServiceImpl<DegreeSubjectEntity, String> implements DegreeSubjectService {

    @Autowired
    private DegreeSubjectRepository degreeSubjectRepository;

    @Override
    public Optional<DegreeSubjectEntity> getIdDegreeAndIdSubject(String idDegree, String idSubject) {
        return degreeSubjectRepository.findByIdDegreeAndIdSubject(idDegree, idSubject);
    }

    @Override
    public JpaRepository<DegreeSubjectEntity, String> getJpaRepository() {
        return degreeSubjectRepository;
    }
}
