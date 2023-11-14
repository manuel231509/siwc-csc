package com.colegiosantacecilia.siwcspringjava.dto.Authentication;

/**
 *
 * @author Sebastian Villamizar
 *
 */
public class AuthenticationRequest {

    private String username;
    private String password;
    private String jwt;

    public AuthenticationRequest() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    @Override
    public String toString() {
        return "AuthenticationRequest{"
                + "\nusername=" + username
                + ", \npassword=" + password
                + ", \njwt=" + jwt
                + "\n" + '}';
    }
}
