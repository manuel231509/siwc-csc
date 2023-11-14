package com.colegiosantacecilia.siwcspringjava.dto.subject;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.springframework.validation.annotation.Validated;

/**
 *
 * @author Sebastian Villamizar
 */
@Validated
public class SubjectDTO {

    private String idSubject;

    @NotBlank(message = "THE SUBJECT NAME FIELD IS REQUIRED.")
    @Size(max = 80, message = "THE SUBJECT NAME FIELD MUST HAVE A MAXIMUM OF 80 CHARACTERS.")
    private String name;

    private String urlImage;

    private int subjectHours;

    @NotNull(message = "THE TEACHER ID NUMBER IS REQUIRED.")
    private long idNumberTeacher;

    public SubjectDTO() {
    }

    public SubjectDTO(String name, long idNumberTeacher) {
        this.name = name;
        this.idNumberTeacher = idNumberTeacher;
    }

    public String getIdSubject() {
        return idSubject;
    }

    public void setIdSubject(String idSubject) {
        this.idSubject = idSubject;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrlImage() {
        return urlImage;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }

    public int getSubjectHours() {
        return subjectHours;
    }

    public void setSubjectHours(int subjectHours) {
        this.subjectHours = subjectHours;
    }

    public long getIdNumberTeacher() {
        return idNumberTeacher;
    }

    public void setIdNumberTeacher(long idNumberTeacher) {
        this.idNumberTeacher = idNumberTeacher;
    }

}
