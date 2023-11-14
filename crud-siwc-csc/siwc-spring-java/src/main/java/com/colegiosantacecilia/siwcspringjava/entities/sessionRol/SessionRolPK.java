package com.colegiosantacecilia.siwcspringjava.entities.sessionRol;

import java.io.Serializable;
import javax.persistence.*;

/**
 *
 * @author Sebastian Villamizar
 */
@Embeddable
public class SessionRolPK implements Serializable {

    private static final long serialVersionUID = -9069060843698080433L;

    @Column(name = "id_number_session", length = 500)
    private String idNumberSession;

    @Column(name = "id_rol", length = 500)
    private String idRol;

    public SessionRolPK() {
    }

    public SessionRolPK(String idNumberSession, String idRol) {
        this.idNumberSession = idNumberSession;
        this.idRol = idRol;
    }

    public String getIdNumberSession() {
        return idNumberSession;
    }

    public void setIdNumberSession(String idNumberSession) {
        this.idNumberSession = idNumberSession;
    }

    public String getIdRol() {
        return idRol;
    }

    public void setIdRol(String idRol) {
        this.idRol = idRol;
    }
}
