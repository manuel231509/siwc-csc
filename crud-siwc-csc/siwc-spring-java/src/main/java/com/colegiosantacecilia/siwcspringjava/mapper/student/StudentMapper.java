package com.colegiosantacecilia.siwcspringjava.mapper.student;

import com.colegiosantacecilia.siwcspringjava.dto.student.StudentDTO;
import com.colegiosantacecilia.siwcspringjava.entities.student.StudentEntity;
import com.colegiosantacecilia.siwcspringjava.mapper.raiting.RaitingMapper;
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
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,uses = {RaitingMapper.class})
public interface StudentMapper {

    @Mappings({
        @Mapping(target = "idNumberStudent", source = "sdto.idNumber"),
        @Mapping(target = "documentTypeStudent", source = "sdto.documentType"),
        @Mapping(target = "fullNamesStudent", source = "sdto.fullNames"),
        @Mapping(target = "fullSurNamesStudent", source = "sdto.fullSurNames"),
        @Mapping(target = "emailAddressStudent", source = "sdto.emailAddress"),
        @Mapping(target = "phoneNumberStudent", source = "sdto.phoneNumber"),
        @Mapping(target = "imagePathStudent", source = "sdto.imagePath"),
        @Mapping(target = "raitingEntitys", source = "sdto.raitingDTOs"),
    })
    StudentEntity toStudentEntity(StudentDTO sdto);

    List<StudentEntity> toStudents(List<StudentDTO> students);

    @InheritInverseConfiguration
    @Mappings({
        @Mapping(target = "nameDegree", ignore = true)})
    StudentDTO toStudentDTO(StudentEntity se);
}
