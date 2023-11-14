package com.colegiosantacecilia.siwcspringjava.dto.student;

import com.colegiosantacecilia.siwcspringjava.dto.raiting.RaitingDTO;
import java.util.LinkedList;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author Sebastian Villamizar
 */
public class StudentDTO {

    @NotNull(message = "THE idNumber FIELD IS REQUIRED.")
    private long idNumber;

    @NotBlank(message = "THE documentType FIELD IS REQUIRED.")
    @Size(max = 100, message = "THE documentType FIELD MUST HAVE A MAXIMUM OF 100 CHARACTERS.")
    private String documentType;

    @NotBlank(message = "THE fullNames FIELD IS REQUIRED.")
    @Size(min = 3, max = 80, message = "THE fullNames FIELD MUST HAVE A MINIMUM OF 3 CHARACTERS AND A MAXIMUM OF 80 CHARACTERS.")
    private String fullNames;

    @NotBlank(message = "THE fullSurNames FIELD IS REQUIRED.")
    @Size(min = 3, max = 80, message = "THE fullSurNames FIELD MUST HAVE A MINIMUM OF 3 CHARACTERS AND A MAXIMUM OF 80 CHARACTERS.")
    private String fullSurNames;

    @NotBlank(message = "THE emailAddress FIELD IS REQUIRED.")
    @Size(min = 10, max = 100, message = "THE emailAddress FIELD MUST HAVE A MINIMUM OF 10 CHARACTERS AND A MAXIMUM OF 100 CHARACTERS.")
    private String emailAddress;

    @Size(min = 10, max = 80, message = "THE phoneNumber FIELD MUST HAVE A MINIMUM OF 10 CHARACTERS AND A MAXIMUM OF 80 CHARACTERS.")
    private String phoneNumber;

    @Size(max = 100, message = "THE imagePath FIELD MUST HAVE A MAXIMUM OF 100 CHARACTERS.")
    private String imagePath;
    
    @NotBlank(message = "THE nameDegree FILED IS REQUIRED")
    @Size(max = 10, message = "THE nameDegree FIELD MUST HAVE A MAXIMUM OF 10 CHARACTERS.")
    private String nameDegree;
    
    @Valid
    private List<RaitingDTO> raitingDTOs = new LinkedList<>();

    public StudentDTO() {
    }

    public StudentDTO(long idNumber, String documentType, String fullNames, String fullSurNames, String emailAddress, String phoneNumber, String nameDegree) {
        this.idNumber = idNumber;
        this.documentType = documentType;
        this.fullNames = fullNames;
        this.fullSurNames = fullSurNames;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.nameDegree = nameDegree;
    }
    
    public long getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(long idNumber) {
        this.idNumber = idNumber;
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public String getFullNames() {
        return fullNames;
    }

    public void setFullNames(String fullNames) {
        this.fullNames = fullNames;
    }

    public String getFullSurNames() {
        return fullSurNames;
    }

    public void setFullSurNames(String fullSurNames) {
        this.fullSurNames = fullSurNames;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getNameDegree() {
        return nameDegree;
    }

    public void setNameDegree(String nameDegree) {
        this.nameDegree = nameDegree;
    }

    public List<RaitingDTO> getRaitingDTOs() {
        return raitingDTOs;
    }

    public void setRaitingDTOs(List<RaitingDTO> raitingDTOs) {
        this.raitingDTOs = raitingDTOs;
    }
    
    public void addRaitingDTOs(RaitingDTO raitingDTO){
        raitingDTOs.add(raitingDTO);
    }

    @Override
    public String toString() {
        return "StudentDTO{"
                + "\nidNumber=" + idNumber
                + ", \ndocumentType=" + documentType
                + ", \nfullNames=" + fullNames
                + ", \nfullSurNames=" + fullSurNames
                + ", \nemailAddress=" + emailAddress
                + ", \nphoneNumber=" + phoneNumber
                + ", \nimagePath=" + imagePath
                + ", \nnameDegree=" + nameDegree + "\n" + '}';
    }

}
