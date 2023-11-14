package com.colegiosantacecilia.siwcspringjava.controlllers.rol;

import com.colegiosantacecilia.siwcspringjava.dto.rol.RoleDTO;
import com.colegiosantacecilia.siwcspringjava.entities.rol.RolEntity;
import com.colegiosantacecilia.siwcspringjava.mapper.rol.RolMapper;
import com.colegiosantacecilia.siwcspringjava.services.rol.RolService;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Sebastian Villamizar
 *
 */
@RestController
@RequestMapping(value = "/rol", produces = "application/json")
public class RolRestController {

    @Autowired
    private RolService rolService;

    @Autowired
    private RolMapper rolMapper;

    @GetMapping(value = "/all-roles")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllRol() {
        List<?> listRoles = rolService.getAll();
        if (!listRoles.isEmpty()) {
            return new ResponseEntity(listRoles, HttpStatus.OK);
        } else {
            return new ResponseEntity("{\"message\":\"NO ROLES LOGS HAS BEEN FOUND.\"}",
                    HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/find-role-byId/{roleId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getByIdRole(@PathVariable String roleId) {
        try {
            return rolService.getById(roleId)
                    .map(role
                            -> new ResponseEntity(role,
                            HttpStatus.OK)
                    ).orElse(new ResponseEntity("{\"message\":\"ROLE ID NUMBER WAS NOT FOUND.\"}",
                            HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return new ResponseEntity("{\"message\":\"" + e.getMessage() + "\"}", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/save-role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> saveRole(@Valid @RequestBody RoleDTO roleDTO) {
        try {
            Optional<RolEntity> getByNameRole = rolService.getNameRole(roleDTO.getName());
            if (!getByNameRole.isEmpty()) {
                return new ResponseEntity("{\"message\":\"THE NAME ROLE YOU ARE TYPING IS ALREADY REGISTERED.\"}",
                        HttpStatus.BAD_REQUEST);
            }
            RolEntity rolEntity = rolMapper.toRolEntity(roleDTO);
            rolService.save(rolEntity);
            return new ResponseEntity("{\"message\":\"THE ROLE REGISTRATION WAS SUCCESSFUL.\"}",
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/save-roles")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> saveRoles(@Valid @RequestBody List<@Valid RoleDTO> listRoleDTO) {
        try {
            for (@Valid RoleDTO roleDTO : listRoleDTO) {
                Optional<RolEntity> getByNameRole = rolService.getNameRole(roleDTO.getName());
                if (!getByNameRole.isEmpty()) {
                    return new ResponseEntity("{\"message\":\"THE NAME ROLE YOU ARE TYPING IS ALREADY REGISTERED.\"}",
                            HttpStatus.BAD_REQUEST);
                }
                RolEntity rolEntity = rolMapper.toRolEntity(roleDTO);
                rolEntity.setIdRol(rolService.getIdRole(roleDTO.getName()).get());
                rolService.save(rolEntity);
            }
            return new ResponseEntity("{\"message\":\"THE ROLE REGISTRATION WAS SUCCESSFUL.\"}",
                    HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
