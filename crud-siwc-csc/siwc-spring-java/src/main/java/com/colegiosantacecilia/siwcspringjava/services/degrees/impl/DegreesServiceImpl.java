package com.colegiosantacecilia.siwcspringjava.services.degrees.impl;

import com.colegiosantacecilia.siwcspringjava.commons.GenericServiceImpl;
import com.colegiosantacecilia.siwcspringjava.entities.degree.DegreeEntity;
import com.colegiosantacecilia.siwcspringjava.repositories.degrees.DegreesRepository;
import com.colegiosantacecilia.siwcspringjava.services.degrees.DegreesService;
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
public class DegreesServiceImpl extends GenericServiceImpl<DegreeEntity, String> implements DegreesService {

    @Autowired
    private DegreesRepository degreesRepository;

    @Override
    public Optional<DegreeEntity> getNameDegree(String nameDegree) {
        return degreesRepository.findByNameDegree(nameDegree);
    }

    @Override
    public Optional<String> getIdDegree(String name_degree) {
        return degreesRepository.functionAssignDegreeIdentification(name_degree);
    }

    @Override
    public List<DegreeEntity> getDegreeAccordingToTeacher(Long id_number_teacher) {
        return degreesRepository.gradesAccordingTeacher(id_number_teacher);
    }

    @Override
    public JpaRepository<DegreeEntity, String> getJpaRepository() {
        return degreesRepository;
    }
}
