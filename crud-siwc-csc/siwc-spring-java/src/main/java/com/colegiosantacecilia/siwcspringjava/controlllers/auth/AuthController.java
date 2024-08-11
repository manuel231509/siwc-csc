package com.colegiosantacecilia.siwcspringjava.controlllers.auth;

import com.colegiosantacecilia.siwcspringjava.Metodos.AuthController.MetAuthController;
import com.colegiosantacecilia.siwcspringjava.controlllers.period.PeriodRestController;
import com.colegiosantacecilia.siwcspringjava.dto.Authentication.*;
import com.colegiosantacecilia.siwcspringjava.dto.raiting.RaitingDTO;
import com.colegiosantacecilia.siwcspringjava.dto.session.SessionDTO;
import com.colegiosantacecilia.siwcspringjava.entities.degree.DegreeEntity;
import com.colegiosantacecilia.siwcspringjava.entities.degreeSubject.DegreeSubjectEntity;
import com.colegiosantacecilia.siwcspringjava.entities.period.PeriodEntity;
import com.colegiosantacecilia.siwcspringjava.entities.raiting.RaitingEntity;
import com.colegiosantacecilia.siwcspringjava.entities.rol.RolEntity;
import com.colegiosantacecilia.siwcspringjava.entities.session.SessionEntity;
import com.colegiosantacecilia.siwcspringjava.entities.sessionRol.SessionRolEntity;
import com.colegiosantacecilia.siwcspringjava.mapper.raiting.RaitingMapper;
import com.colegiosantacecilia.siwcspringjava.mapper.session.SessionMapper;
import com.colegiosantacecilia.siwcspringjava.security.JWTUtil;
import com.colegiosantacecilia.siwcspringjava.services.degrees.DegreesService;
import com.colegiosantacecilia.siwcspringjava.services.period.PeriodService;
import com.colegiosantacecilia.siwcspringjava.services.raiting.RaitingService;
import com.colegiosantacecilia.siwcspringjava.services.rol.RolService;
import com.colegiosantacecilia.siwcspringjava.services.session.SessionService;
import io.jsonwebtoken.ExpiredJwtException;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author Sebastian Villamizar
 *
 */
@RestController
@RequestMapping(value = "/auth/", produces = "application/json")
@CrossOrigin("${origins}")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private SessionService sessionService;

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private RolService rolService;

    @Autowired
    private DegreesService degreesService;

    @Autowired
    private MetAuthController metAuthController;

    @Autowired
    private RaitingService raitingService;

    @Autowired
    private PeriodRestController periodRestController;

    @Autowired
    private PeriodService periodService;

    @Autowired
    private RaitingMapper raitingMapper;

    @Autowired
    private SessionMapper sessionMapper;

    @PostMapping(value = "/login")
    public ResponseEntity<?> createTokenLogin(@RequestBody AuthenticationRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String jwt = "";
            if (request.getJwt().equals("")) {
                jwt = jwtUtil.generateToken(authentication);
            } else {
                try {
                    if (!jwtUtil.validateToken(request.getJwt(), userDetails)) {
                        jwt = jwtUtil.generateToken(authentication);
                    } else {
                        jwt = request.getJwt();
                    }
                } catch (ExpiredJwtException ej) {
                    return new ResponseEntity("{\"message\":\"" + ej.getMessage() + "\"}", HttpStatus.FORBIDDEN
                    );
                }
            }
            Optional<SessionEntity> seOptional = sessionService.getUserNameSession(userDetails.getUsername());
            return new ResponseEntity(new AuthenticationResponse(userDetails.getUsername(),
                    userDetails.getAuthorities(),
                    jwt, seOptional.get()), HttpStatus.OK);
        } catch (BadCredentialsException bce) {
            return new ResponseEntity("{\"message\":\"THE USERNAME OR PASSWORD IS INCORRECT, PLEASE CHECK THE FIELDS ENTERED.\"}", HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping(value = "/login/register-session")
    public ResponseEntity<?> saveSession(@Valid @RequestBody SessionDTO sessionDTO) {
        try {
            Optional<RolEntity> rolEntity = rolService.getNameRole(sessionDTO.getRolName());

            if (rolEntity.isPresent()) {

                ResponseEntity validateFields = metAuthController.validateFields(sessionDTO);

                if (validateFields != null) {
                    return validateFields;
                }

                sessionDTO.setPassword(sessionService.encryptPassword(sessionDTO.getPassword()));
                String sessionId = sessionService.getIdStudentTeacherAdmin(sessionDTO.getRolName()).get();

                SessionEntity sessionEntity = sessionMapper.toSessionEntity(sessionDTO);
                sessionEntity.setIdNumberSession(sessionId);

                switch (sessionDTO.getRolName()) {
                    case "ROLE_ADMIN":
                        sessionEntity.getAdministrator().setIdNumberSession(sessionEntity.getIdNumberSession());
                        break;
                    case "ROLE_STUDENT":
                        sessionEntity.getStudent().setIdNumberSession(sessionEntity.getIdNumberSession());
                        Optional<DegreeEntity> dOptional = degreesService.getNameDegree(sessionDTO.getStudentDTO().getNameDegree());
                        if (!dOptional.isPresent()) {
                            return new ResponseEntity("{\"message\":\"INVALID NAME GRADE.\"}",
                                    HttpStatus.BAD_REQUEST);
                        }
                        sessionEntity.getStudent().setIdDegree(dOptional.get().getIdDegree());
                        break;
                    case "ROLE_TEACHER":
                        sessionEntity.getTeacher().setIdNumberSession(sessionEntity.getIdNumberSession());
                        break;
                    default:
                        break;
                }

                sessionEntity.addListSessionRolEntitys(new SessionRolEntity(sessionEntity, rolEntity.get()));

                sessionService.save(sessionEntity);

                return new ResponseEntity("{\"message\":\"THE SESSION'S REGISTRATION WAS SUCCESSFUL.\"}",
                        HttpStatus.CREATED);

            } else {
                return new ResponseEntity("{\"message\":\"INVALID ROLE.\"}",
                        HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity("{\"message\":\"" + e.getMessage() + "\"}",
                    HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/login/register-sessions")
    public ResponseEntity<?> saveSessions(@Valid @RequestBody List<SessionDTO> listSessionDTO) {
        try {
            for (SessionDTO sessionDTO : listSessionDTO) {
                Optional<RolEntity> rolEntity = rolService.getNameRole(sessionDTO.getRolName());

                if (!rolEntity.isPresent()) {
                    return new ResponseEntity("{\"message\":\"INVALID ROLE.\"}",
                            HttpStatus.BAD_REQUEST);
                }
                ResponseEntity validateFields = metAuthController.validateFields(sessionDTO);

                if (validateFields != null) {
                    return validateFields;
                }

                sessionDTO.setPassword(sessionService.encryptPassword(sessionDTO.getPassword()));
                String sessionId = sessionService.getIdStudentTeacherAdmin(sessionDTO.getRolName()).get();

                SessionEntity sessionEntity = sessionMapper.toSessionEntity(sessionDTO);
                sessionEntity.setIdNumberSession(sessionId);

                switch (sessionDTO.getRolName()) {
                    case "ROLE_ADMIN":
                        sessionEntity.getAdministrator().setIdNumberSession(sessionEntity.getIdNumberSession());
                        break;
                    case "ROLE_STUDENT":
                        sessionEntity.getStudent().setIdNumberSession(sessionEntity.getIdNumberSession());
                        Optional<DegreeEntity> dOptional = degreesService.getNameDegree(sessionDTO.getStudentDTO().getNameDegree());
                        if (!dOptional.isPresent()) {
                            return new ResponseEntity("{\"message\":\"INVALID NAME GRADE.\"}",
                                    HttpStatus.BAD_REQUEST);
                        }
                        sessionEntity.getStudent().setIdDegree(dOptional.get().getIdDegree());
                        break;
                    case "ROLE_TEACHER":
                        sessionEntity.getTeacher().setIdNumberSession(sessionEntity.getIdNumberSession());
                        break;
                    default:
                        break;
                }

                sessionEntity.addListSessionRolEntitys(new SessionRolEntity(sessionEntity, rolEntity.get()));

                sessionService.save(sessionEntity);

                switch (sessionDTO.getRolName()) {
                    case "ROLE_STUDENT":
                        List<PeriodEntity> periodEntitys = periodService.getAll();

                        if (periodEntitys.isEmpty()) {
                            return new ResponseEntity("{\"message\":\"NO PERIODS LOGS HAS BEEN FOUND.\"}",
                                    HttpStatus.NOT_FOUND);
                        }

                        Optional<DegreeEntity> dOptional = degreesService.getNameDegree(sessionDTO.getStudentDTO().getNameDegree());
                        if (!dOptional.isPresent()) {
                            return new ResponseEntity("{\"message\":\"INVALID NAME GRADE.\"}",
                                    HttpStatus.BAD_REQUEST);
                        }

                        List<DegreeSubjectEntity> degreeSubjectEntitys = dOptional.get().getDegreeSubjectEntitys();

                        if (degreeSubjectEntitys.isEmpty()) {
                            return new ResponseEntity("{\"message\":\"NO DEGREE_SUBJECT LOGS HAS BEEN FOUND.\"}",
                                    HttpStatus.NOT_FOUND);
                        }

                        for (PeriodEntity periodEntity : periodEntitys) {
                            for (DegreeSubjectEntity degreeSubjectEntity : dOptional.get().getDegreeSubjectEntitys()) {
                                RaitingDTO raitingDTO = new RaitingDTO(periodEntity.getIdPeriod(),
                                        0.0, 0.0, 0, degreeSubjectEntity.getIdDegSubj(),
                                        sessionDTO.getStudentDTO().getIdNumber());
                                RaitingEntity raitingEntity = raitingMapper.toRaitingEntity(raitingDTO);
                                raitingEntity.setIdRaiting(raitingDTO.getIdPeriod() + "_" + raitingDTO.getIdDegSubj() + "_" + raitingDTO.getIdNumberStudent());
                                raitingService.save(raitingEntity);
                            }
                        }
                        break;
                    default:
                        break;
                }

            }
            return new ResponseEntity("{\"message\":\"THE SESSION'S REGISTRATION WAS SUCCESSFUL.\"}",
                    HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity("{\"message\":\"" + e.getMessage() + "\"}",
                    HttpStatus.BAD_REQUEST);
        }
    }

}
