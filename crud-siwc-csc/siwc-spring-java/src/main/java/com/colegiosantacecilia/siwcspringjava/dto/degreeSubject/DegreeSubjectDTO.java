package com.colegiosantacecilia.siwcspringjava.dto.degreeSubject;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import org.springframework.validation.annotation.Validated;

/**
 *
 * @author Sebastian Villamizar
 */
@Validated
public class DegreeSubjectDTO {

    private String idDegree;

    @NotBlank(message = "THE nameDegree FIELD IS REQUIRED.")
    @Size(max = 50, message = "THE nameDegree FIELD MUST HAVE A MAXIMUM OF 50 CHARACTERS.")
    private String nameDegree;

    private String idSubject;

    @NotBlank(message = "THE nameSubject FIELD IS REQUIRED.")
    @Size(max = 80, message = "THE nameSubject FIELD MUST HAVE A MAXIMUM OF 80 CHARACTERS.")
    private String nameSubject;

    public DegreeSubjectDTO() {
    }

    public String getIdDegree() {
        return idDegree;
    }

    public void setIdDegree(String idDegree) {
        this.idDegree = idDegree;
    }

    public String getNameDegree() {
        return nameDegree;
    }

    public void setNameDegree(String nameDegree) {
        this.nameDegree = nameDegree;
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

    @Override
    public String toString() {
        return "DegreeSubjectDTO{"
                + "\nidDegree=" + idDegree
                + "\nnameDegree=" + nameDegree
                + "\nidSubject=" + idSubject
                + ", \nnameSubject=" + nameSubject + '}';
    }

}
