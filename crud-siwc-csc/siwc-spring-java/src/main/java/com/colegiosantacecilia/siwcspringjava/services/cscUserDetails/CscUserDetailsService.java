package com.colegiosantacecilia.siwcspringjava.services.cscUserDetails;

import com.colegiosantacecilia.siwcspringjava.entities.session.SessionEntity;
import com.colegiosantacecilia.siwcspringjava.entities.sessionRol.SessionRolEntity;
import com.colegiosantacecilia.siwcspringjava.services.session.SessionService;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

/**
 *
 * @author Sebastian Villamizar
 *
 */
@Service
public class CscUserDetailsService implements UserDetailsService {

    @Autowired
    private SessionService sessionService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<SessionEntity> sessionEntity = sessionService.getUserNameSession(username);
        if (!sessionEntity.isPresent()) {
            throw new UsernameNotFoundException("USERNAME DOES NOT EXIST");
        } else {
            Collection authorities = mapRoles(sessionEntity.get().getSessionRolEntitys());
            return new User(sessionEntity.get().getUserNameSession(), "{bcrypt}" + sessionEntity.get().getPasswordSession(), authorities);
        }
    }

    private Collection<? extends GrantedAuthority> mapRoles(List<SessionRolEntity> roles) {
        return roles.stream().map(rol
                -> new SimpleGrantedAuthority(rol.getRolEntity().getNameRole()))
                .collect(Collectors.toList());
    }

}
