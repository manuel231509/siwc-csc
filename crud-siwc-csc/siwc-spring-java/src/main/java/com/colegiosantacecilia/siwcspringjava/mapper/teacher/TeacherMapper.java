package com.colegiosantacecilia.siwcspringjava.mapper.teacher;

import com.colegiosantacecilia.siwcspringjava.dto.teacher.TeacherDTO;
import com.colegiosantacecilia.siwcspringjava.entities.teacher.TeacherEntity;
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
public interface TeacherMapper {

    @Mappings({
        @Mapping(target = "idNumberTeacher", source = "tdto.idNumber"),
        @Mapping(target = "documentTypeTeacher", source = "tdto.documentType"),
        @Mapping(target = "fullNamesTeacher", source = "tdto.fullNames"),
        @Mapping(target = "fullSurNamesTeacher", source = "tdto.fullSurNames"),
        @Mapping(target = "emailAddressTeacher", source = "tdto.emailAddress"),
        @Mapping(target = "phoneNumberTeacher", source = "tdto.phoneNumber"),
        @Mapping(target = "imagePathTeacher", source = "tdto.imagePath")
    })
    TeacherEntity toTeacherEntity(TeacherDTO tdto);

    List<TeacherEntity> toTeachers(List<TeacherDTO> teachers);

    @InheritInverseConfiguration
    TeacherDTO toTeacherDTO(TeacherEntity te);
}
