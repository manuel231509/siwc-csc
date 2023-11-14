package com.colegiosantacecilia.siwcspringjava.dto.session;

import com.colegiosantacecilia.siwcspringjava.dto.administrator.AdministratorDTO;
import com.colegiosantacecilia.siwcspringjava.dto.student.StudentDTO;
import com.colegiosantacecilia.siwcspringjava.dto.teacher.TeacherDTO;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import org.springframework.validation.annotation.Validated;

/**
 *
 * @author Sebastian Villamizar
 */
@Validated
public class SessionDTO {

    @NotBlank(message = "THE userName FIELD IS REQUIRED.")
    @Size(min = 3, max = 80, message = "THE userNameSession FIELD MUST HAVE A MINIMUM OF 3 CHARACTERS AND A MAXIMUM OF 80 CHARACTERS.")
    private String userName;

    @NotBlank(message = "THE password FIELD IS REQUIRED.")
    @Size(min = 4, max = 300, message = "THE passwordSession FIELD MUST HAVE A MINIMUM OF 4 CHARACTERS AND A MAXIMUM OF 300 CHARACTERS.")
    private String password;

    @NotBlank(message = "THE nameRol FIELD IS REQUIRED.")
    private String rolName;

//    private boolean loggedInSession = false;
//
//    private boolean rememberSession = false;
    @Valid
    private AdministratorDTO administratorDTO = null;

    @Valid
    private StudentDTO studentDTO = null;

    @Valid
    private TeacherDTO teacherDTO = null;

    public SessionDTO() {
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRolName() {
        return rolName;
    }

    public void setRolName(String rolName) {
        this.rolName = rolName;
    }

//    public boolean isLoggedInSession() {
//        return loggedInSession;
//    }
//
//    public void setLoggedInSession(boolean loggedInSession) {
//        this.loggedInSession = loggedInSession;
//    }
//
//    public boolean isRememberSession() {
//        return rememberSession;
//    }
//
//    public void setRememberSession(boolean rememberSession) {
//        this.rememberSession = rememberSession;
//    }

    public AdministratorDTO getAdministratorDTO() {
        return administratorDTO;
    }

    public void setAdministratorDTO(AdministratorDTO administratorDTO) {
        this.administratorDTO = administratorDTO;
    }

    public StudentDTO getStudentDTO() {
        return studentDTO;
    }

    public void setStudentDTO(StudentDTO studentDTO) {
        this.studentDTO = studentDTO;
    }

    public TeacherDTO getTeacherDTO() {
        return teacherDTO;
    }

    public void setTeacherDTO(TeacherDTO teacherDTO) {
        this.teacherDTO = teacherDTO;
    }

    @Override
    public String toString() {
        return "SessionDTO{"
                + ", \nuserNameSession=" + userName
                + ", \npasswordSession=" + password
                + ", \nnameRol=" + rolName
                //                + ", \nloggedInSession=" + loggedInSession
                //                + ", \nrememberSession=" + rememberSession
                + ", \nadministratorDTO=" + administratorDTO
                + ", \nstudentDTO=" + studentDTO
                + ", \nteacherDTO=" + teacherDTO + "\n" + '}';
    }

}
