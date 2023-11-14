package com.colegiosantacecilia.siwcspringjava.controlllers.session;

import com.colegiosantacecilia.siwcspringjava.entities.rol.RolEntity;
import com.colegiosantacecilia.siwcspringjava.entities.session.SessionEntity;
import com.colegiosantacecilia.siwcspringjava.entities.sessionRol.SessionRolEntity;
import com.colegiosantacecilia.siwcspringjava.services.rol.RolService;
import com.colegiosantacecilia.siwcspringjava.services.session.SessionService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Sebastian Villamizar
 *
 */
@RestController
@RequestMapping(value = "/session/", produces = "application/json")
public class SessionRestController {
    
    @Autowired
    private SessionService sessionService;
    
    @Autowired
    private RolService rolService;
    
    @GetMapping(value = "/all-session")
    public ResponseEntity<?> getAllSession() {
        List<SessionEntity> listSessions = sessionService.getAll();
        if (!listSessions.isEmpty()) {
            return new ResponseEntity(listSessions,
                    HttpStatus.OK);
        } else {
            return new ResponseEntity("{\"message\":\"NO SESSIONS LOGS HAS BEEN FOUND.\"}",
                    HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping(value = "/find-session-byId/{sessionId}")
    public ResponseEntity<?> getByIdSession(@PathVariable String sessionId) {
        return sessionService.getById(sessionId)
                .map(session
                        -> new ResponseEntity(session,
                        HttpStatus.FOUND)
                ).orElse(new ResponseEntity("{\"message\":\"SESSION ID NUMBER WAS NOT FOUND.\"}",
                        HttpStatus.NOT_FOUND));
    }
    
    @PostMapping(value = "/save-session")
    public ResponseEntity<?> saveSession(@RequestBody SessionEntity sessionEntity) {
        try {
            Optional<SessionEntity> getUserName = sessionService.getUserNameSession(sessionEntity.getUserNameSession());
            if (getUserName.isPresent()) {
                return new ResponseEntity("{\"message\":\"THE USER YOU ARE ENTERING IS ALREADY REGISTERED,"
                        + " PLEASE ENTER ANOTHER USER.\"}",
                        HttpStatus.BAD_REQUEST);
            }
            sessionEntity.setPasswordSession(sessionService.encryptPassword(sessionEntity.getPasswordSession()));
            
            RolEntity rolEntity = rolService.getNameRole("ROLE_STUDENT").get();
            
            sessionEntity.addListSessionRolEntitys(new SessionRolEntity(sessionEntity, rolEntity));
            sessionService.save(sessionEntity);
            return new ResponseEntity("{\"message\":\"THE SESSION'S REGISTRATION WAS SUCCESSFUL.\"}",
                    HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity("{\"message\":\"" + e.getMessage() + "\"}",
                    HttpStatus.BAD_REQUEST);
        }
    }
    
    @PutMapping(value = "/update-session/{sessionId}")
    public ResponseEntity<?> updateSession(@RequestBody SessionEntity sessionEntity, @PathVariable String sessionId) {
        Optional<SessionEntity> getByIdSession = sessionService.getById(sessionId);
        if (getByIdSession.isPresent()) {
            sessionService.save(sessionEntity);
            return new ResponseEntity("{\"message\":\"THE SESSION WAS SUCCESSFULLY UPGRADED.\"}",
                    HttpStatus.OK);
        } else {
            return new ResponseEntity("{\"message\":\"COULD NOT UPDATE THE SESSION SUCCESSFULLY, "
                    + "THE SESSION ID DOES NOT EXIST.\"}",
                    HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping(value = "/delete-session/{sessionId}")
    public ResponseEntity<?> deleteSession(@PathVariable String sessionId) {
        return sessionService.getById(sessionId)
                .map(session -> {
                    sessionService.deleteById(session.getIdNumberSession());
                    return new ResponseEntity("{\"message\":\"THE SESSION WAS SUCCESSFULLY ELIMINATED.\"}",
                            HttpStatus.OK);
                })
                .orElse(new ResponseEntity("{\"message\":\"THE STUDENT COULD NOT BE DELETED SUCCESSFULLY, "
                        + "THE STUDENT ID DOES NOT EXIST.\"}",
                        HttpStatus.NOT_FOUND));
    }
    
}
