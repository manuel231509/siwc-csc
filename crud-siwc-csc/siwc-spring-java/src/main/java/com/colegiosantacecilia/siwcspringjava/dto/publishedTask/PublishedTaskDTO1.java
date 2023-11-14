package com.colegiosantacecilia.siwcspringjava.dto.publishedTask;

import com.colegiosantacecilia.siwcspringjava.dto.publishedFile.PublishedFileDTO;
import com.colegiosantacecilia.siwcspringjava.dto.student.StudentDTO;
import java.util.Date;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.Size;
import org.springframework.lang.NonNull;
import org.springframework.validation.annotation.Validated;

/**
 *
 * @author Sebastian Villamizar
 */
@Validated
public class PublishedTaskDTO1 {

    @Size(max = 500, message = "THE idPublishedTask FIELD MUST HAVE A MAXIMUM OF 500 CHARACTERS.")
    private String idPublishedTask;

    private Double taskNote;

    @Size(max = 200, message = "THE studentComment FIELD MUST HAVE A MAXIMUM OF 500 CHARACTERS.")
    private String studentComment;

    private Boolean delivered = false;

    private Date dateTaskDelivered = null;

    @Size(max = 200, message = "THE teacherComment FIELD MUST HAVE A MAXIMUM OF 500 CHARACTERS.")
    private String teacherComment;

    private Boolean qualifiedTask = false;

    @Valid
    private List<PublishedFileDTO> publishedFileDTOs = null;

    @NonNull
    private Long idNumberStudent;

    @Valid
    private StudentDTO studentDTO;

    @Size(max = 500, message = "THE idTask FIELD MUST HAVE A MAXIMUM OF 500 CHARACTERS.")
    private String idTask;

    public PublishedTaskDTO1() {
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

    public String getStudentComment() {
        return studentComment;
    }

    public void setStudentComment(String studentComment) {
        this.studentComment = studentComment;
    }

    public Boolean getDelivered() {
        return delivered;
    }

    public void setDelivered(Boolean delivered) {
        this.delivered = delivered;
    }

    public Date getDateTaskDelivered() {
        return dateTaskDelivered;
    }

    public void setDateTaskDelivered(Date dateTaskDelivered) {
        this.dateTaskDelivered = dateTaskDelivered;
    }

    public String getTeacherComment() {
        return teacherComment;
    }

    public void setTeacherComment(String teacherComment) {
        this.teacherComment = teacherComment;
    }

    public Boolean getQualifiedTask() {
        return qualifiedTask;
    }

    public void setQualifiedTask(Boolean qualifiedTask) {
        this.qualifiedTask = qualifiedTask;
    }

    public List<PublishedFileDTO> getPublishedFileDTOs() {
        return publishedFileDTOs;
    }

    public void setPublishedFileDTOs(List<PublishedFileDTO> publishedFileDTOs) {
        this.publishedFileDTOs = publishedFileDTOs;
    }

    public Long getIdNumberStudent() {
        return idNumberStudent;
    }

    public void setIdNumberStudent(Long idNumberStudent) {
        this.idNumberStudent = idNumberStudent;
    }

    public StudentDTO getStudentDTO() {
        return studentDTO;
    }

    public void setStudentDTO(StudentDTO studentDTO) {
        this.studentDTO = studentDTO;
    }

    public String getIdTask() {
        return idTask;
    }

    public void setIdTask(String idTask) {
        this.idTask = idTask;
    }

    @Override
    public String toString() {
        return "PublishedTaskDTO1{"
                + "\nidPublishedTask=" + idPublishedTask
                + ",\n taskNote=" + taskNote
                + ",\n studentComment=" + studentComment
                + ",\n delivered=" + delivered
                + ",\n dateTaskDelivered=" + dateTaskDelivered
                + ",\n teacherComment=" + teacherComment
                + ",\n qualifiedTask=" + qualifiedTask
                + ",\n publishedFileDTOs=" + publishedFileDTOs
                + ",\n idNumberStudent=" + idNumberStudent
                + ",\n idTask=" + idTask + "\n"
                + '}';
    }

}
