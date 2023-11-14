package com.colegiosantacecilia.siwcspringjava.mapper.session;

import com.colegiosantacecilia.siwcspringjava.dto.session.*;
import com.colegiosantacecilia.siwcspringjava.entities.session.SessionEntity;
import com.colegiosantacecilia.siwcspringjava.mapper.administrator.AdministratorMapper;
import com.colegiosantacecilia.siwcspringjava.mapper.student.StudentMapper;
import com.colegiosantacecilia.siwcspringjava.mapper.teacher.TeacherMapper;
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
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = {AdministratorMapper.class, StudentMapper.class, TeacherMapper.class})
public interface SessionMapper {

    @Mappings({
        @Mapping(target = "userNameSession", source = "sdto.userName"),
        @Mapping(target = "passwordSession", source = "sdto.password"),
//        @Mapping(target = "loggedInSession", source = "sdto.loggedInSession"),
//        @Mapping(target = "rememberSession", source = "sdto.rememberSession"),
        @Mapping(target = "administrator", source = "sdto.administratorDTO"),
        @Mapping(target = "student", source = "sdto.studentDTO"),
        @Mapping(target = "teacher", source = "sdto.teacherDTO")
    })
    SessionEntity toSessionEntity(SessionDTO sdto);

    List<SessionEntity> toSessions(List<SessionDTO> sessions);

    @InheritInverseConfiguration
    @Mappings({
        @Mapping(target = "rolName", ignore = true)
    })
    SessionDTO toSessionDTO(SessionEntity se);
}
