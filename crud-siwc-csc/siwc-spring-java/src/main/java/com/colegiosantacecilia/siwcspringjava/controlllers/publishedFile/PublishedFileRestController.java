package com.colegiosantacecilia.siwcspringjava.controlllers.publishedFile;


import com.colegiosantacecilia.siwcspringjava.controlllers.taskFile.*;
import com.colegiosantacecilia.siwcspringjava.services.publishedFile.PublishedFileService;
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
@RequestMapping(value = "/published-task-file", produces = "application/json")
@CrossOrigin(origins = "${origins}", allowCredentials = "true")
public class PublishedFileRestController {

    @Autowired
    private PublishedFileService publishedFileService;

    @GetMapping(value = "all-published-task-files")
    @PreAuthorize("hasRole('ADMIN') or hasRole('STUDENT')")
    public ResponseEntity<?> getAllPublishedTask() {
        List<?> listPublishedFiles = publishedFileService.getAll();
        if (listPublishedFiles.isEmpty()) {
            return new ResponseEntity("{\"message\":\"NO PUBLISHED TASK FILES LOGS HAS BEEN FOUND.\"}", HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity(listPublishedFiles, HttpStatus.OK);
    }
    
}
