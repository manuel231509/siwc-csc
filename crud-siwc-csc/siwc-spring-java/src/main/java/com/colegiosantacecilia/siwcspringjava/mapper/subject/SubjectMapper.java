package com.colegiosantacecilia.siwcspringjava.mapper.subject;

import com.colegiosantacecilia.siwcspringjava.dto.subject.SubjectDTO;
import com.colegiosantacecilia.siwcspringjava.dto.subject.SubjectTeacherDTO;
import com.colegiosantacecilia.siwcspringjava.entities.subject.SubjectEntity;
import java.util.List;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Mappings;

/**
 *
 * @author Sebastian Villamizar
 */
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface SubjectMapper {

    /**
     *
     * @param sdto
     * @return
     */
    @Mappings({
        @Mapping(target = "nameSubject", source = "sdto.name"),
        @Mapping(target = "urlImage", source = "sdto.urlImage"),
        @Mapping(target = "subjectHours", source = "sdto.subjectHours"),
        @Mapping(target = "idNumberTeacher", source = "sdto.idNumberTeacher"),
        @Mapping(target = "degreeSubjectEntitys", ignore = true)
    })
    SubjectEntity toSubjectEntity(SubjectDTO sdto);

    List<SubjectEntity> subjectEntitys(List<SubjectDTO> subjectDTOs);

    @InheritInverseConfiguration
    SubjectDTO toSubjectDTO(SubjectEntity se);

    /**
     *
     * @param se
     * @return
     */
    @Mappings({
        @Mapping(target = "idSubject", source = "se.idSubject"),
        @Mapping(target = "nameSubject", source = "se.nameSubject"),
        @Mapping(target = "urlImage", source = "se.urlImage"),
        @Mapping(target = "subjectHours", source = "se.subjectHours"),
        @Mapping(target = "teacherDTO", ignore = true)
    })
    SubjectTeacherDTO toSubjectTeacherDTO(SubjectEntity se);

}
