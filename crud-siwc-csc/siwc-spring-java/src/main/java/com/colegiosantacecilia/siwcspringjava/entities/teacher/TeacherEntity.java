package com.colegiosantacecilia.siwcspringjava.entities.teacher;

import com.colegiosantacecilia.siwcspringjava.entities.session.SessionEntity;
import com.colegiosantacecilia.siwcspringjava.entities.subject.SubjectEntity;
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
 *
 */
@Entity
@Table(name = "teacher")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TeacherEntity implements Serializable {

    private static final long serialVersionUID = -9069060843698080433L;

    @Id
    @Column(name = "id_number_teacher", nullable = false, unique = true)
    private Long idNumberTeacher;

    @Column(name = "id_number_session", nullable = false, length = 500, unique = true)
    private String idNumberSession;

    @Column(name = "document_type_teacher", nullable = false, length = 100)
    private String documentTypeTeacher;

    @Column(name = "full_names_teacher", nullable = false, length = 80)
    private String fullNamesTeacher;

    @Column(name = "full_surnames_teacher", nullable = false, length = 80)
    private String fullSurNamesTeacher;

    @Column(name = "email_address", unique = true, nullable = false, length = 100)
    private String emailAddressTeacher;

    @Column(name = "phone_number_teacher", unique = true, columnDefinition = "VARCHAR(80) DEFAULT '0'")
    private String phoneNumberTeacher = "0";

    @Column(name = "image_path_teacher", length = 100)
    private String imagePathTeacher = "";

    @OneToOne(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            optional = false)
    @JoinColumn(name = "id_number_session",
            foreignKey = @ForeignKey(name = "teacher_session_fk",
                    value = ConstraintMode.CONSTRAINT),
            nullable = false, insertable = false, updatable = false)
    private SessionEntity sessionTeacher;

    @OneToMany(mappedBy = "teacherEntity",
            cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    private List<SubjectEntity> subjectEntitys
            = new LinkedList<>();

    public TeacherEntity() {
    }

    public TeacherEntity(Long idNumberTeacher, String idNumberSession, String documentTypeTeacher, String fullNamesTeacher, String fullSurNamesTeacher, String emailAddressTeacher) {
        this.idNumberTeacher = idNumberTeacher;
        this.idNumberSession = idNumberSession;
        this.documentTypeTeacher = documentTypeTeacher;
        this.fullNamesTeacher = fullNamesTeacher;
        this.fullSurNamesTeacher = fullSurNamesTeacher;
        this.emailAddressTeacher = emailAddressTeacher;
    }

    public Long getIdNumberTeacher() {
        return idNumberTeacher;
    }

    public void setIdNumberTeacher(Long idNumberTeacher) {
        this.idNumberTeacher = idNumberTeacher;
    }

    public String getIdNumberSession() {
        return idNumberSession;
    }

    public void setIdNumberSession(String idNumberSession) {
        this.idNumberSession = idNumberSession;
    }

    public String getDocumentTypeTeacher() {
        return documentTypeTeacher;
    }

    public void setDocumentTypeTeacher(String documentTypeTeacher) {
        this.documentTypeTeacher = documentTypeTeacher;
    }

    public String getFullNamesTeacher() {
        return fullNamesTeacher;
    }

    public void setFullNamesTeacher(String fullNamesTeacher) {
        this.fullNamesTeacher = fullNamesTeacher;
    }

    public String getFullSurNamesTeacher() {
        return fullSurNamesTeacher;
    }

    public void setFullSurNamesTeacher(String fullSurNamesTeacher) {
        this.fullSurNamesTeacher = fullSurNamesTeacher;
    }

    public String getEmailAddressTeacher() {
        return emailAddressTeacher;
    }

    public void setEmailAddressTeacher(String emailAddress) {
        this.emailAddressTeacher = emailAddress;
    }

    public String getPhoneNumberTeacher() {
        return phoneNumberTeacher;
    }

    public void setPhoneNumberTeacher(String phoneNumberTeacher) {
        this.phoneNumberTeacher = phoneNumberTeacher;
    }

    public String getImagePathTeacher() {
        return imagePathTeacher;
    }

    public void setImagePathTeacher(String imagePathTeacher) {
        this.imagePathTeacher = imagePathTeacher;
    }

    public List<SubjectEntity> getSubjectEntitys() {
        return subjectEntitys;
    }

    public void setSubjectEntitys(List<SubjectEntity> subjectEntitys) {
        this.subjectEntitys = subjectEntitys;
    }

    public void addListSubjectEntitys(SubjectEntity se) {
        this.subjectEntitys.add(se);
    }

    @Override
    public String toString() {
        return "TeacherEntity{"
                + "\nidNumberTeacher=" + idNumberTeacher + ","
                + "\nidNumberSession=" + idNumberSession + ","
                + "\ndocumentTypeTeacher=" + documentTypeTeacher + ","
                + "\nfullNamesTeacher=" + fullNamesTeacher + ","
                + "\nfullSurNamesTeacher=" + fullSurNamesTeacher + ","
                + "\nemailAddressTeacher=" + emailAddressTeacher + ","
                + "\nphoneNumberTeacher=" + phoneNumberTeacher + ","
                + "\nimagePathTeacher=" + imagePathTeacher + ","
                + "\nsessionTeacher=" + sessionTeacher + "\n"
                + '}';
    }

}
