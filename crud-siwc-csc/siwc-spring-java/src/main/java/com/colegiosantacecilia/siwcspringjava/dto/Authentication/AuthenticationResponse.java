package com.colegiosantacecilia.siwcspringjava.dto.Authentication;

import com.colegiosantacecilia.siwcspringjava.entities.session.SessionEntity;
import java.util.Collection;
import org.springframework.security.core.GrantedAuthority;

/**
 *
 * @author Sebastian Villamizar
 *
 */
public class AuthenticationResponse {

    private String username;
    private Collection<? extends GrantedAuthority> authorities;
    private String jwt;
    private String bearer = "Bearer";
    private SessionEntity session;

    public AuthenticationResponse(String username, Collection<? extends GrantedAuthority> authorities, String jwt, SessionEntity session) {
        this.username = username;
        this.authorities = authorities;
        this.jwt = jwt;
        this.session = session;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public String getBearer() {
        return bearer;
    }

    public SessionEntity getSession() {
        return session;
    }

    public void setSession(SessionEntity session) {
        this.session = session;
    }

}
