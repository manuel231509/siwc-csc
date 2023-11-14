package com.colegiosantacecilia.siwcspringjava.dto.publishedTask;

import javax.validation.constraints.Size;
import org.springframework.lang.NonNull;
import org.springframework.validation.annotation.Validated;

/**
 *
 * @author Sebastian Villamizar
 */
@Validated
public class PublishedTaskDTO {

    @Size(max = 500, message = "THE idPublishedTask FIELD MUST HAVE A MAXIMUM OF 500 CHARACTERS.")
    private String idPublishedTask;

    @NonNull
    private Double taskNote;

    @NonNull
    private Long idNumberStudent;

    @Size(max = 500, message = "THE idTask FIELD MUST HAVE A MAXIMUM OF 500 CHARACTERS.")
    private String idTask;

    public PublishedTaskDTO() {
    }

    public String getIdPublishedTask() {
        return idPublishedTask;
    }

    public void setIdPublishedTask(String idPublishedTask) {
        this.idPublishedTask = idPublishedTask;
    }

    public Double getTaskNote() {
        return taskNote;
    }

    public void setTaskNote(Double taskNote) {
        this.taskNote = taskNote;
    }

    public Long getIdNumberStudent() {
        return idNumberStudent;
    }

    public void setIdNumberStudent(Long idNumberStudent) {
        this.idNumberStudent = idNumberStudent;
    }

    public String getIdTask() {
        return idTask;
    }

    public void setIdTask(String idTask) {
        this.idTask = idTask;
    }

    @Override
    public String toString() {
        return "{"
                + "\nidPublishedTask=" + idPublishedTask
                + "\ntaskNote=" + taskNote
                + ", \nidNumberStudent=" + idNumberStudent
                + ", \nidTask=" + idTask + '}';
    }

}
