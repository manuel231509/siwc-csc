package com.colegiosantacecilia.siwcspringjava.entities.student;

import com.colegiosantacecilia.siwcspringjava.entities.degree.DegreeEntity;
import com.colegiosantacecilia.siwcspringjava.entities.publishedTask.PublishedTaskEntity;
import com.colegiosantacecilia.siwcspringjava.entities.raiting.RaitingEntity;
import java.io.Serializable;
import javax.persistence.*;
import com.colegiosantacecilia.siwcspringjava.entities.session.SessionEntity;
import java.util.LinkedList;
import java.util.List;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

/**
 *
 * @author Sebastian Villamizar
 *
 */
@Entity
@Table(name = "student")
public class StudentEntity implements Serializable {

    private static final long serialVersionUID = -9069060843698080433L;

    @Id
    @Column(name = "id_number_student")
    private Long idNumberStudent;

    @Column(name = "document_type_student", nullable = false, length = 100)
    private String documentTypeStudent;

    @Column(name = "full_names_student", nullable = false, length = 80)
    private String fullNamesStudent;

    @Column(name = "full_surnames_student", nullable = false, length = 80)
    private String fullSurNamesStudent;

    @Column(name = "email_address_student", unique = true, nullable = false, length = 100)
    private String emailAddressStudent;

    @Column(name = "phone_number_student", unique = true, columnDefinition = "VARCHAR(80) DEFAULT '0'")
    private String phoneNumberStudent = "0";

    @Column(name = "image_path_student", length = 100)
    private String imagePathStudent = "";

    @Column(name = "id_number_session", nullable = false, length = 500, unique = true)
    private String idNumberSession;

    @Column(name = "id_degree", nullable = false, length = 500)
    private String idDegree;

    @OneToOne(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            optional = false)
    @JoinColumn(name = "id_number_session",
            foreignKey = @ForeignKey(name = "session_student_FK",
                    value = ConstraintMode.CONSTRAINT),
            nullable = false, insertable = false, updatable = false)
    private SessionEntity sessionStudent;

    @ManyToOne(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            optional = false)
    @MapsId("idDegree")
    @JoinColumn(name = "id_degree",
            foreignKey = @ForeignKey(name = "degree_student_FK",
                    value = ConstraintMode.CONSTRAINT),
            nullable = false, insertable = false, updatable = false)
    private DegreeEntity degreeEntity;

    @OneToMany(mappedBy = "studentEntity",
            fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Fetch(value = FetchMode.SUBSELECT)
    private List<RaitingEntity> raitingEntitys
            = new LinkedList<>();
    
    @OneToMany(mappedBy = "studentEntity",
              fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Fetch(value = FetchMode.SUBSELECT)
    private List<PublishedTaskEntity> publishedTaskEntitys
              = new LinkedList<>(); 

    public StudentEntity() {
    }

    public StudentEntity(Long idNumberStudent, String idNumberSession, String documentTypeStudent, String fullNamesStudent, String fullSurNamesStudent, String emailAddressStudent) {
        this.idNumberStudent = idNumberStudent;
        this.idNumberSession = idNumberSession;
        this.documentTypeStudent = documentTypeStudent;
        this.fullNamesStudent = fullNamesStudent;
        this.fullSurNamesStudent = fullSurNamesStudent;
        this.emailAddressStudent = emailAddressStudent;
    }

    public Long getIdNumberStudent() {
        return idNumberStudent;
    }

    public void setIdNumberSession(String idNumberSession) {
        this.idNumberSession = idNumberSession;
    }

    public String getDocumentTypeStudent() {
        return documentTypeStudent;
    }

    public void setDocumentTypeStudent(String documentTypeStudent) {
        this.documentTypeStudent = documentTypeStudent;
    }

    public String getFullNamesStudent() {
        return fullNamesStudent;
    }

    public void setFullNamesStudent(String fullNamesStudent) {
        this.fullNamesStudent = fullNamesStudent;
    }

    public String getFullSurNamesStudent() {
        return fullSurNamesStudent;
    }

    public void setFullSurNamesStudent(String fullSurNamesStudent) {
        this.fullSurNamesStudent = fullSurNamesStudent;
    }

    public String getEmailAddressStudent() {
        return emailAddressStudent;
    }

    public void setEmailAddressStudent(String emailAddressStudent) {
        this.emailAddressStudent = emailAddressStudent;
    }

    public String getPhoneNumberStudent() {
        return phoneNumberStudent;
    }

    public void setPhoneNumberStudent(String phoneNumberStudent) {
        this.phoneNumberStudent = phoneNumberStudent;
    }

    public String getImagePathStudent() {
        return imagePathStudent;
    }

    public void setImagePathStudent(String imagePathStudent) {
        this.imagePathStudent = imagePathStudent;
    }

    public void setIdNumberStudent(Long idNumberStudent) {
        this.idNumberStudent = idNumberStudent;
    }

    public String getIdNumberSession() {
        return idNumberSession;
    }

    public String getIdDegree() {
        return idDegree;
    }

    public void setIdDegree(String idDegree) {
        this.idDegree = idDegree;
    }

    public List<RaitingEntity> getRaitingEntitys() {
        return raitingEntitys;
    }

    public void setRaitingEntitys(List<RaitingEntity> raitingEntitys) {
        this.raitingEntitys = raitingEntitys;
    }

    public void addListRaitingEntitys(RaitingEntity re) {
        this.raitingEntitys.add(re);
    }

    public List<PublishedTaskEntity> getPublishedTaskEntitys() {
        return publishedTaskEntitys;
    }

    @Override
    public String toString() {
        return "StudentEntity{"
                + "\nidNumberStudent=" + idNumberStudent
                + ", \ndocumentTypeStudent=" + documentTypeStudent
                + ", \nfullNamesStudent=" + fullNamesStudent
                + ", \nfullSurNamesStudent=" + fullSurNamesStudent
                + ", \nemailAddressStudent=" + emailAddressStudent
                + ", \nphoneNumberStudent=" + phoneNumberStudent
                + ", \nimagePathStudent=" + imagePathStudent
                + ", \nsessionStudent=" + sessionStudent
                + ", \ndegreeEntity=" + degreeEntity
                + ", \nraitingEntitys=" + raitingEntitys
                + "\n" + '}' + "\n";
    }

}
