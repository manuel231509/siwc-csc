package com.colegiosantacecilia.siwcspringjava.controlllers.taskFile;

import com.colegiosantacecilia.siwcspringjava.services.taskFile.TaskFileService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Sebastian Villamizar
 */
@RestController
@RequestMapping(value = "/task-file", produces = "application/json")
@CrossOrigin(origins = "${origins}", allowCredentials = "true")
public class TaskFileRestController {

    @Autowired
    private TaskFileService taskFileService;

    @GetMapping(value = "all-task-files")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllTaskFiles() {
        List<?> listTaskFiles = taskFileService.getAll();
        if (listTaskFiles.isEmpty()) {
            return new ResponseEntity("{\"message\":\"NO TASK FILES LOGS HAS BEEN FOUND.\"}", HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity(listTaskFiles, HttpStatus.OK);
    }
    
}
