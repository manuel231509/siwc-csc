package com.colegiosantacecilia.siwcspringjava.entities.rol;

import java.io.Serializable;
import javax.persistence.*;

/**
 *
 * @author Sebastian Villamizar
 */
@Entity
@Table(name = "rols")
public class RolEntity implements Serializable {

    private static final long serialVersionUID = -9069060843698080433L;

    @Id
    @Column(name = "id_rol", length = 500)
    private String idRol;

    @Column(name = "name_role", unique = true, nullable = false, length = 60)
    private String nameRole;

    public RolEntity() {
    }

    public String getIdRol() {
        return idRol;
    }

    public void setIdRol(String idRole) {
        this.idRol = idRole;
    }

    public String getNameRole() {
        return nameRole;
    }

    public void setNameRole(String nameRole) {
        this.nameRole = nameRole;
    }

    @Override
    public String toString() {
        return "RolEntity{" 
                + "\nidRol= " + idRol + ", "
                + "\nnameRole= " + nameRole + "\n"+ '}';
    }
    
    
}
