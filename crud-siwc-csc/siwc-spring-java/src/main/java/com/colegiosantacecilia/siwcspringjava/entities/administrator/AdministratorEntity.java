package com.colegiosantacecilia.siwcspringjava.entities.administrator;

import com.colegiosantacecilia.siwcspringjava.entities.session.SessionEntity;
import java.io.Serializable;
import javax.persistence.*;

/**
 *
 * @author Sebastian Villamizar
 *
 */
@Entity
@Table(name = "administrator")
public class AdministratorEntity implements Serializable {

    private static final long serialVersionUID = -9069060843698080433L;

    @Id
    @Column(name = "id_number_admin", nullable = false, unique = true)
    private Long idNumberAdministrator;

    @Column(name = "id_number_session", nullable = false, length = 500, unique = true)
    private String idNumberSession;

    @Column(name = "document_type_admin", nullable = false, length = 100)
    private String documentTypeAdministrator;

    @Column(name = "full_names_admin", nullable = false, length = 80)
    private String fullNamesAdministrator;

    @Column(name = "full_surnames_admin", nullable = false, length = 80)
    private String fullSurNamesAdministrator;

    @Column(name = "email_address_admin", unique = true, nullable = false, length = 100)
    private String emailAddressAdministrator;

    @Column(name = "phone_number_admin", unique = true, columnDefinition = "VARCHAR(80) DEFAULT '0'")
    private String phoneNumberAdministrator = "0";

    @Column(name = "image_path_admin", length = 100)
    private String imagePathAdministrator = "";

    @OneToOne(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            optional = false)
    @JoinColumn(name = "id_number_session",
            foreignKey = @ForeignKey(name = "admin_session_FK",
                    value = ConstraintMode.CONSTRAINT),
            nullable = false, insertable = false, updatable = false)
    private SessionEntity sessionAdministrator;

    public AdministratorEntity() {
    }

    public AdministratorEntity(Long idNumberAdministrator, String idNumberSession, String documentTypeAdministrator, String fullNamesAdministrator, String fullSurNamesAdministrator, String emailAddressAdministrator) {
        this.idNumberAdministrator = idNumberAdministrator;
        this.idNumberSession = idNumberSession;
        this.documentTypeAdministrator = documentTypeAdministrator;
        this.fullNamesAdministrator = fullNamesAdministrator;
        this.fullSurNamesAdministrator = fullSurNamesAdministrator;
        this.emailAddressAdministrator = emailAddressAdministrator;
    }

    public Long getIdNumberAdministrator() {
        return idNumberAdministrator;
    }

    public void setIdNumberAdministrator(Long idNumberAdministrator) {
        this.idNumberAdministrator = idNumberAdministrator;
    }

    public String getIdNumberSession() {
        return idNumberSession;
    }

    public void setIdNumberSession(String idNumberSession) {
        this.idNumberSession = idNumberSession;
    }

    public String getDocumentTypeAdministrator() {
        return documentTypeAdministrator;
    }

    public void setDocumentTypeAdministrator(String documentTypeAdministrator) {
        this.documentTypeAdministrator = documentTypeAdministrator;
    }

    public String getFullNamesAdministrator() {
        return fullNamesAdministrator;
    }

    public void setFullNamesAdministrator(String fullNamesAdministrator) {
        this.fullNamesAdministrator = fullNamesAdministrator;
    }

    public String getFullSurNamesAdministrator() {
        return fullSurNamesAdministrator;
    }

    public void setFullSurNamesAdministrator(String fullSurNamesAdministrator) {
        this.fullSurNamesAdministrator = fullSurNamesAdministrator;
    }

    public String getEmailAddressAdministrator() {
        return emailAddressAdministrator;
    }

    public void setEmailAddressAdministrator(String emailAddressAdministrator) {
        this.emailAddressAdministrator = emailAddressAdministrator;
    }

    public String getPhoneNumberAdministrator() {
        return phoneNumberAdministrator;
    }

    public void setPhoneNumberAdministrator(String phoneNumberAdministrator) {
        this.phoneNumberAdministrator = phoneNumberAdministrator;
    }

    public String getImagePathAdministrator() {
        return imagePathAdministrator;
    }

    public void setImagePathAdministrator(String imagePathAdministrator) {
        this.imagePathAdministrator = imagePathAdministrator;
    }

    @Override
    public String toString() {
        return "AdministratorEntity{"
                + "\nidNumberAdministrator=" + idNumberAdministrator
                + ", \n idNumberSession=" + idNumberSession
                + ", \n documentTypeAdministrator=" + documentTypeAdministrator
                + ", \n fullNamesAdministrator=" + fullNamesAdministrator
                + ", \n fullSurNamesAdministrator=" + fullSurNamesAdministrator
                + ", \n emailAddressAdministrator=" + emailAddressAdministrator
                + ", \n phoneNumberAdministrator=" + phoneNumberAdministrator
                + ", \n imagePathAdministrator=" + imagePathAdministrator
                + ", \n sessionAdministrator=" + sessionAdministrator + "\n" + '}';
    }

}
