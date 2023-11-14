package com.colegiosantacecilia.siwcspringjava.dto.myProperties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 *
 * @author Sebastian Villamizar
 */
@Component
public class MyProperties {
    @Value("${origins}")
    private String origins;

    public String getOrigins() {
        return origins;
    }

    public void setOrigins(String origins) {
        this.origins = origins;
    }
    
    
}
