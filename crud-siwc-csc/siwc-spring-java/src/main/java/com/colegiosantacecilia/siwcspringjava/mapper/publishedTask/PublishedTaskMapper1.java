package com.colegiosantacecilia.siwcspringjava.mapper.publishedTask;

import com.colegiosantacecilia.siwcspringjava.dto.publishedTask.PublishedTaskDTO1;
import com.colegiosantacecilia.siwcspringjava.entities.publishedTask.PublishedTaskEntity;
import com.colegiosantacecilia.siwcspringjava.mapper.publishedFile.PublishedFileMapper;
import com.colegiosantacecilia.siwcspringjava.mapper.student.StudentMapper;
import java.util.List;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Mappings;

/**
 *
 * @author Sebstian Villamizar
 */
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = {PublishedFileMapper.class, StudentMapper.class})
public interface PublishedTaskMapper1 {

    @Mappings({
        @Mapping(target = "idPublishedTask", source = "ptdto.idPublishedTask"),
        @Mapping(target = "taskNote", source = "ptdto.taskNote"),
        @Mapping(target = "taskStudentComment", source = "ptdto.studentComment"),
        @Mapping(target = "taskDelivered", source = "ptdto.delivered"),
        @Mapping(target = "dateTaskDelivered", source = "ptdto.dateTaskDelivered"),
        @Mapping(target = "taskTeacherComment", source = "ptdto.teacherComment"),
        @Mapping(target = "idNumberStudent", source = "ptdto.idNumberStudent"),
        @Mapping(target = "idTask", source = "ptdto.idTask"),
        @Mapping(target = "publishedFileEntitys", source = "ptdto.publishedFileDTOs"),
    })
    PublishedTaskEntity toPublishedTaskEntity(PublishedTaskDTO1 ptdto);

    List<PublishedTaskEntity> toPublishedTaskEntitys(List<PublishedTaskDTO1> publishedTaskDTOs);

    @InheritInverseConfiguration
     @Mappings({
        @Mapping(target = "studentDTO", ignore = true),
     })
    PublishedTaskDTO1 toPublishedTaskDTO1(PublishedTaskEntity pte);
}
