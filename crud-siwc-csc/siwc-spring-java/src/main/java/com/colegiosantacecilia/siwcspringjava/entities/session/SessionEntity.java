package com.colegiosantacecilia.siwcspringjava.entities.session;

import com.colegiosantacecilia.siwcspringjava.entities.administrator.AdministratorEntity;
import com.colegiosantacecilia.siwcspringjava.entities.sessionRol.SessionRolEntity;
import com.colegiosantacecilia.siwcspringjava.entities.student.StudentEntity;
import com.colegiosantacecilia.siwcspringjava.entities.teacher.TeacherEntity;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;
import javax.persistence.*;

/**
 *
 * @author Sebastian Villamizar
 *
 */
@Entity
@Table(name = "ssession")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SessionEntity implements Serializable {

    private static final long serialVersionUID = -9069060843698080433L;

    @Id
    @Column(name = "id_number_session", length = 500)
    private String idNumberSession;

    @Column(name = "user_name_session", unique = true, nullable = false, length = 80)
    private String userNameSession;

    @Column(name = "password_session", length = 300, nullable = false)
    private String passwordSession;

//    @Column(name = "logged_in_session", columnDefinition = "BOOL DEFAULT false")
//    private Boolean loggedInSession = false;
//
//    @Column(name = "remember_session", columnDefinition = "BOOL DEFAULT false")
//    private Boolean rememberSession = false;
    @OneToOne(mappedBy = "sessionAdministrator",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    private AdministratorEntity administrator;

    @OneToOne(mappedBy = "sessionStudent",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    private StudentEntity student;

    @OneToOne(mappedBy = "sessionTeacher",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER)
    private TeacherEntity teacher;

    @OneToMany(mappedBy = "sessionEntity",
            cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<SessionRolEntity> sessionRolEntitys
            = new LinkedList<>();

    public SessionEntity() {
    }

    public SessionEntity(String idNumberSession, String userNameSession, String passwordSession) {
        this.idNumberSession = idNumberSession;
        this.userNameSession = userNameSession;
        this.passwordSession = passwordSession;
    }

    public String getIdNumberSession() {
        return idNumberSession;
    }

    public void setIdNumberSession(String idNumberSession) {
        this.idNumberSession = idNumberSession;
    }

    public String getUserNameSession() {
        return userNameSession;
    }

    public void setUserNameSession(String userNameSession) {
        this.userNameSession = userNameSession;
    }

    public String getPasswordSession() {
        return passwordSession;
    }

    public void setPasswordSession(String passwordSession) {
        this.passwordSession = passwordSession;
    }

//    public Boolean getLoggedInSession() {
//        return loggedInSession;
//    }
//
//    public void setLoggedInSession(Boolean loggedInSession) {
//        this.loggedInSession = loggedInSession;
//    }
//
//    public Boolean getRememberSession() {
//        return rememberSession;
//    }
//
//    public void setRememberSession(Boolean rememberSession) {
//        this.rememberSession = rememberSession;
//    }
    public AdministratorEntity getAdministrator() {
        return administrator;
    }

    public void setAdministrator(AdministratorEntity administrator) {
        this.administrator = administrator;
    }

    public StudentEntity getStudent() {
        return student;
    }

    public void setStudent(StudentEntity student) {
        this.student = student;
    }

    public TeacherEntity getTeacher() {
        return teacher;
    }

    public void setTeacher(TeacherEntity teacher) {
        this.teacher = teacher;
    }

    public List<SessionRolEntity> getSessionRolEntitys() {
        return sessionRolEntitys;
    }

    public void setSessionRolEntitys(List<SessionRolEntity> sessionRolEntitys) {
        this.sessionRolEntitys = sessionRolEntitys;
    }

    public void addListSessionRolEntitys(SessionRolEntity sre) {
        this.sessionRolEntitys.add(sre);
    }

    @Override
    public String toString() {
        return "SessionEntity{"
                + "\nidNumberSession=" + idNumberSession
                + ", \nuserNameSession=" + userNameSession
                + ", \npasswordSession=" + passwordSession
                //                + ", \nloggedInSession=" + loggedInSession
                //                + ", \nrememberSession=" + rememberSession
                + ", \nstudent=" + student
                + ", \nteacher=" + teacher
                + ", \nsessionRolEntitys=" + sessionRolEntitys + '}' + "\n";
    }

}
