package com.colegiosantacecilia.siwcspringjava.entities.sessionRol;

import com.colegiosantacecilia.siwcspringjava.entities.rol.RolEntity;
import com.colegiosantacecilia.siwcspringjava.entities.session.SessionEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import javax.persistence.*;

/**
 *
 * @author Sebastian Villamizar
 */
@Entity
@Table(name = "session_roles")
public class SessionRolEntity implements Serializable {

    private static final long serialVersionUID = -9069060843698080433L;

    @EmbeddedId
    private SessionRolPK sessionRolPK = new SessionRolPK();

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("idNumberSession")
    @JoinColumn(name = "id_number_session",
            foreignKey = @ForeignKey(name = "session_rols_FK",
                    value = ConstraintMode.CONSTRAINT),
            insertable = false, updatable = false)
    private SessionEntity sessionEntity;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("idRol")
    @JoinColumn(name = "id_rol",
            foreignKey = @ForeignKey(name = "rols_ssession_FK",
                    value = ConstraintMode.CONSTRAINT),
            insertable = false, updatable = false)
    private RolEntity rolEntity;

    public SessionRolEntity() {
    }

    public SessionRolEntity(SessionEntity sessionEntity, RolEntity rolEntity) {
        this.sessionEntity = sessionEntity;
        this.rolEntity = rolEntity;
    }

    public SessionRolPK getSessionRolPK() {
        return sessionRolPK;
    }

    public void setSessionRolPK(SessionRolPK sessionRolPK) {
        this.sessionRolPK = sessionRolPK;
    }

    public SessionEntity getSessionEntity() {
        return sessionEntity;
    }

    public void setSessionEntity(SessionEntity sessionEntity) {
        this.sessionEntity = sessionEntity;
    }

    public RolEntity getRolEntity() {
        return rolEntity;
    }

    public void setRolEntity(RolEntity rolEntity) {
        this.rolEntity = rolEntity;
    }

}
