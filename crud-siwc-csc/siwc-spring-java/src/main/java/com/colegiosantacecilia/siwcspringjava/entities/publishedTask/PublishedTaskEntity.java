package com.colegiosantacecilia.siwcspringjava.entities.publishedTask;

import com.colegiosantacecilia.siwcspringjava.entities.publishedFile.PublishedFileEntity;
import com.colegiosantacecilia.siwcspringjava.entities.student.StudentEntity;
import com.colegiosantacecilia.siwcspringjava.entities.task.TaskEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import java.io.Serializable;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

/**
 *
 * @author Sebastian Villamizar
 */
@Entity
@Table(name = "published_task")
public class PublishedTaskEntity implements Serializable {

    private static final long serialVersionUID = -9069060843698080433L;

    @Id
    @Column(name = "id_published_task", length = 500)
    private String idPublishedTask;

    @Column(name = "task_note")
    private Double taskNote;

    @Column(name = "task_student_comment", length = 200)
    private String taskStudentComment;

    @Column(name = "task_delivered", nullable = false, columnDefinition = "TINYINT(1) default 0")
    private Boolean taskDelivered = false;

    @Column(name = "date_task_delivered")
    @Temporal(value = TemporalType.TIMESTAMP)
    private Date dateTaskDelivered;

    @Column(name = "task_teacher_comment", length = 200)
    private String taskTeacherComment;

    @Column(name = "qualified_task", nullable = false, columnDefinition = "TINYINT(1) default 0")
    private Boolean qualifiedTask = false;

    @Column(name = "id_number_student")
    private Long idNumberStudent;

    @ManyToOne(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            optional = false)
    @MapsId("idNumberStudent")
    @JoinColumn(name = "id_number_student",
            foreignKey = @ForeignKey(name = "student_task_FK",
                    value = ConstraintMode.CONSTRAINT),
            nullable = false, insertable = false, updatable = false)
    private StudentEntity studentEntity;

    @Column(name = "id_task", length = 500)
    private String idTask;

    @ManyToOne(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            optional = false)
    @MapsId("idTask")
    @JoinColumn(name = "id_task",
            foreignKey = @ForeignKey(name = "task_student_FK",
                    value = ConstraintMode.CONSTRAINT),
            nullable = false, insertable = false, updatable = false)
    private TaskEntity taskEntity;

    @OneToMany(mappedBy = "publishedTaskEntity",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    private List<PublishedFileEntity> publishedFileEntitys
            = new LinkedList<>();

    public PublishedTaskEntity() {
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

    public String getTaskStudentComment() {
        return taskStudentComment;
    }

    public void setTaskStudentComment(String taskStudentComment) {
        this.taskStudentComment = taskStudentComment;
    }

    public Boolean getTaskDelivered() {
        return taskDelivered;
    }

    public void setTaskDelivered(Boolean taskDelivered) {
        this.taskDelivered = taskDelivered;
    }

    public Date getDateTaskDelivered() {
        return dateTaskDelivered;
    }

    public void setDateTaskDelivered(Date dateTaskDelivered) {
        this.dateTaskDelivered = dateTaskDelivered;
    }

    public String getTaskTeacherComment() {
        return taskTeacherComment;
    }

    public void setTaskTeacherComment(String taskTeacherComment) {
        this.taskTeacherComment = taskTeacherComment;
    }

    public Boolean getQualifiedTask() {
        return qualifiedTask;
    }

    public void setQualifiedTask(Boolean qualifiedTask) {
        this.qualifiedTask = qualifiedTask;
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

    public List<PublishedFileEntity> getPublishedFileEntitys() {
        return publishedFileEntitys;
    }

    public void setPublishedFileEntitys(List<PublishedFileEntity> publishedFileEntitys) {
        this.publishedFileEntitys = publishedFileEntitys;
    }

    public void addPublishedFileEntitys(PublishedFileEntity taskFileEntity) {
        this.publishedFileEntitys.add(taskFileEntity);
    }

    public void addAllPublishedFileEntitys(List<PublishedFileEntity> taskFileEntitys) {
        this.publishedFileEntitys.addAll(taskFileEntitys);
    }

    @Override
    public String toString() {
        return "PublishedTaskEntity{"
                + "\nidPublishedTask=" + idPublishedTask
                + ",\n taskNote=" + taskNote
                + ",\n taskStudentComment=" + taskStudentComment
                + ",\n taskDelivered=" + taskDelivered
                + ",\n dateTaskDelivered=" + dateTaskDelivered
                + ",\n taskTeacherComment=" + taskTeacherComment
                + ",\n qualifiedTask=" + qualifiedTask
                + ",\n idNumberStudent=" + idNumberStudent
                + ",\n studentEntity=" + studentEntity
                + ",\n idTask=" + idTask
                + ",\n publishedFileEntitys=" + publishedFileEntitys + "\n"
                + ",\n taskEntity=" + taskEntity + "\n"
                + '}';
    }
}
