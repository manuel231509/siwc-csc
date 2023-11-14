package com.colegiosantacecilia.siwcspringjava.mapper.task;

import com.colegiosantacecilia.siwcspringjava.dto.task.TaskDTO1;
import com.colegiosantacecilia.siwcspringjava.entities.task.TaskEntity;
import com.colegiosantacecilia.siwcspringjava.mapper.periodPlan.PeriodPlanMapper1;
import com.colegiosantacecilia.siwcspringjava.mapper.publishedTask.PublishedTaskMapper1;
import com.colegiosantacecilia.siwcspringjava.mapper.taskFile.TaskFileMapper;
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
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        uses = {
            TaskFileMapper.class,
            PeriodPlanMapper1.class,
            PublishedTaskMapper1.class
        })
public interface TaskMapper1 {

    /**
     *
     * @param tdto
     * @return
     */
    @Mappings({
        @Mapping(target = "idTask", source = "tdto.id"),
        @Mapping(target = "taskName", source = "tdto.name"),
        @Mapping(target = "taskDescription", source = "tdto.description"),
        @Mapping(target = "taskQualificationPoints", source = "tdto.qualificationPoints"),
        @Mapping(target = "datePublicationTask", source = "tdto.datePublicationTask"),
        @Mapping(target = "taskDeadLine", source = "tdto.deadline"),
        @Mapping(target = "taskTimeLimit", source = "tdto.timeLimit"),
        @Mapping(target = "taskFileEntitys", source = "tdto.taskFileDTOs"),
        @Mapping(target = "publishedTaskEntitys", source = "tdto.publishedTaskDTOs"),
        @Mapping(target = "idPeriodPlan", ignore = true),
    })
    TaskEntity toTaskEntity(TaskDTO1 tdto);

    List<TaskEntity> toTaskEntitys(List<TaskDTO1> taskDTO1s);

    /**
     *
     * @param te
     * @return
     */
    @InheritInverseConfiguration
    @Mappings({
        @Mapping(target = "periodPlanDTO1", ignore = true)
    })
    TaskDTO1 toTaskDTO1(TaskEntity te);

    List<TaskDTO1> toTaskDTO1s(List<TaskEntity> tes);
}
