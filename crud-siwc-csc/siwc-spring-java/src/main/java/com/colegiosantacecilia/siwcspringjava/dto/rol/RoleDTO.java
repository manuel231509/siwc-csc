package com.colegiosantacecilia.siwcspringjava.dto.rol;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import org.springframework.validation.annotation.Validated;

/**
 *
 * @author Sebastian Villamizar
 */
@Validated
public class RoleDTO {


    @NotBlank(message = "THE nameRole FIELD IS REQUIRED.")
    @Size(max = 60, message = "THE nameRole FIELD MUST HAVE A MAXIMUM OF 60 CHARACTERS.")
    private String name;

    public RoleDTO() {
    }

    public RoleDTO(String name) {
        this.name = name;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "RoleDTO{"
                + ", \nname=" + name
                + "\n" + '}';
    }

}
