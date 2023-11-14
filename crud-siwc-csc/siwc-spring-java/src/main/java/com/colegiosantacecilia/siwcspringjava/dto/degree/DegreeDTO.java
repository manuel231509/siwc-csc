package com.colegiosantacecilia.siwcspringjava.dto.degree;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import org.springframework.validation.annotation.Validated;

/**
 *
 * @author Sebastian Villamizar
 */
@Validated
public class DegreeDTO {

    @NotBlank(message = "THE nameDegree FIELD IS REQUIRED.")
    @Size(max = 50, message = "THE nameDegree FIELD MUST HAVE A MAXIMUM OF 50 CHARACTERS.")
    private String name;

    public DegreeDTO() {
    }

    public DegreeDTO(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
