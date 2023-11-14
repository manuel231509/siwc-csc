package com.colegiosantacecilia.siwcspringjava.dto.raiting;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import org.springframework.validation.annotation.Validated;

/**
 *
 * @author Sebastian Villamizar
 */
@Validated
public class RaitingDTO {

    private String id;

    @NotBlank(message = "THE idPeriod FIELD IS REQUIRED.")
    @Size(max = 200, message = "THE idPeriod FIELD MUST HAVE A MAXIMUM OF 200 CHARACTERS.")
    private String idPeriod;

    private Double activitiesNote;

    private Double bimonthlyNote;

    private long numberActivites;

    @NotBlank(message = "THE idDegSubj FIELD IS REQUIRED.")
    @Size(max = 255, message = "THE idDegSubj FIELD MUST HAVE A MAXIMUM OF 255 CHARACTERS.")
    private String idDegSubj;

    private long idNumberStudent;

    public RaitingDTO() {
    }

    public RaitingDTO(String idPeriod, Double activitiesNote, Double bimonthlyNote, long numberActivites, String idDegSubj, long idNumberStudent) {
        this.idPeriod = idPeriod;
        this.activitiesNote = activitiesNote;
        this.bimonthlyNote = bimonthlyNote;
        this.numberActivites = numberActivites;
        this.idDegSubj = idDegSubj;
        this.idNumberStudent = idNumberStudent;
    }
    public RaitingDTO(String idRaiting,String idPeriod, Double activitiesNote, Double bimonthlyNote, long numberActivites, String idDegSubj, long idNumberStudent) {
        this.id = idRaiting;
        this.idPeriod = idPeriod;
        this.activitiesNote = activitiesNote;
        this.bimonthlyNote = bimonthlyNote;
        this.numberActivites = numberActivites;
        this.idDegSubj = idDegSubj;
        this.idNumberStudent = idNumberStudent;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIdPeriod() {
        return idPeriod;
    }

    public Double getActivitiesNote() {
        return activitiesNote;
    }

    public void setActivitiesNote(Double activitiesNote) {
        this.activitiesNote = activitiesNote;
    }

    public Double getBimonthlyNote() {
        return bimonthlyNote;
    }

    public void setBimonthlyNote(Double bimonthlyNote) {
        this.bimonthlyNote = bimonthlyNote;
    }

    public Long getNumberActivites() {
        return numberActivites;
    }

    public void setNumberActivites(Long numberActivites) {
        this.numberActivites = numberActivites;
    }

    public void setIdPeriod(String idPeriod) {
        this.idPeriod = idPeriod;
    }

    public String getIdDegSubj() {
        return idDegSubj;
    }

    public void setIdDegSubj(String idDegSubj) {
        this.idDegSubj = idDegSubj;
    }

    public long getIdNumberStudent() {
        return idNumberStudent;
    }

    public void setIdNumberStudent(long idNumberStudent) {
        this.idNumberStudent = idNumberStudent;
    }
}
