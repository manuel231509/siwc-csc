package com.colegiosantacecilia.siwcspringjava.entities.subject;

import com.colegiosantacecilia.siwcspringjava.entities.degreeSubject.DegreeSubjectEntity;
import com.colegiosantacecilia.siwcspringjava.entities.teacher.TeacherEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;
import javax.persistence.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

/**
 *
 * @author Sebastian Villamizar
 */
@Entity
@Table(name = "subject")
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class SubjectEntity implements Serializable {

    private static final long serialVersionUID = -9069060843698080433L;

    @Id
    @Column(name = "id_subject", length = 255)
    private String idSubject;

    @Column(name = "name_subject", nullable = false, unique = true, length = 80)
    private String nameSubject;

    @Column(name = "url_image", length = 500)
    private String urlImage;

    @Column(name = "subject_hours", nullable = false)
    private Integer subjectHours;

    @Column(name = "id_number_teacher", nullable = false)
    private Long idNumberTeacher;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = false)
    @MapsId("idNumberTeacher")
    @JoinColumn(name = "id_number_teacher",
            foreignKey = @ForeignKey(name = "teacher_subject_FK", value = ConstraintMode.CONSTRAINT),
            nullable = false, insertable = false, updatable = false)
    //@JsonIgnore
    private TeacherEntity teacherEntity;

    @OneToMany(mappedBy = "subjectEntity",
            cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Fetch(value = FetchMode.SUBSELECT)
    //@JsonIgnore
    private List<DegreeSubjectEntity> degreeSubjectEntitys
            = new LinkedList<>();

    public SubjectEntity() {
    }

    public String getIdSubject() {
        return idSubject;
    }

    public void setIdSubject(String idSubject) {
        this.idSubject = idSubject;
    }

    public String getNameSubject() {
        return nameSubject;
    }

    public void setNameSubject(String nameSubject) {
        this.nameSubject = nameSubject;
    }

    public String getUrlImage() {
        return urlImage;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }

    public Integer getSubjectHours() {
        return subjectHours;
    }

    public void setSubjectHours(Integer subjectHours) {
        this.subjectHours = subjectHours;
    }

    public Long getIdNumberTeacher() {
        return idNumberTeacher;
    }

    public void setIdNumberTeacher(Long idNumberTeacher) {
        this.idNumberTeacher = idNumberTeacher;
    }

    public List<DegreeSubjectEntity> getDegreeSubjectEntitys() {
        return degreeSubjectEntitys;
    }

    public void setDegreeSubjectEntitys(List<DegreeSubjectEntity> degreeSubjectEntitys) {
        this.degreeSubjectEntitys = degreeSubjectEntitys;
    }

    public void addListDegreeSubjectEntitys(DegreeSubjectEntity degreeSubjectEntity) {
        this.degreeSubjectEntitys.add(degreeSubjectEntity);
    }

    @Override
    public String toString() {
        return "SubjectEntity{"
                + "\nidSubject=" + idSubject
                + ", \nnameSubject=" + nameSubject
                + ", \nurlImage=" + urlImage
                + ", \nsubjectHours=" + subjectHours
                + ", \nidNumberTeacher=" + idNumberTeacher
                + ", \nteacherEntity=" + teacherEntity
                + ", \ndegreeSubjectEntitys=" + degreeSubjectEntitys
                + "\n" + '}';
    }

}
