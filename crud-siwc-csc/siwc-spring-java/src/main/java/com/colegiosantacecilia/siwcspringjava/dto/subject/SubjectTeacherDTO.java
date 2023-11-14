package com.colegiosantacecilia.siwcspringjava.dto.subject;

import com.colegiosantacecilia.siwcspringjava.dto.teacher.TeacherDTO;
import com.colegiosantacecilia.siwcspringjava.entities.teacher.TeacherEntity;
import org.springframework.validation.annotation.Validated;

/**
 *
 * @author Sebastian Villamizar
 */
@Validated
public class SubjectTeacherDTO {

    private String idSubject;

    private String nameSubject;

    private String urlImage;

    private int subjectHours;

    private TeacherDTO teacherDTO;

    public SubjectTeacherDTO() {
    }

    public SubjectTeacherDTO(String idSubject, String nameSubject, String urlImage, TeacherDTO teacherDTO) {
        this.idSubject = idSubject;
        this.nameSubject = nameSubject;
        this.urlImage = urlImage;
        this.teacherDTO = teacherDTO;
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

    public int getSubjectHours() {
        return subjectHours;
    }

    public void setSubjectHours(int subjectHours) {
        this.subjectHours = subjectHours;
    }

    public TeacherDTO getTeacherDTO() {
        return teacherDTO;
    }

    public void setTeacherDTO(TeacherDTO teacherDTO) {
        this.teacherDTO = teacherDTO;
    }

}
