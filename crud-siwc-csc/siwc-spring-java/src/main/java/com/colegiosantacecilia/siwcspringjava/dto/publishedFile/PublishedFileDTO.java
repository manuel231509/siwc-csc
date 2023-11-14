package com.colegiosantacecilia.siwcspringjava.dto.publishedFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.springframework.validation.annotation.Validated;

/**
 *
 * @author Sebastian Villamizar
 */
@Validated
public class PublishedFileDTO {

    @NotBlank(message = "THE id FIELD IS REQUIRED.")
    @Size(max = 500, message = "THE id FIELD MUST HAVE A MAXIMUM OF 500 CHARACTERS.")
    private String id;

    @NotBlank(message = "THE name FIELD IS REQUIRED.")
    @Size(max = 150, message = "THE name FIELD MUST HAVE A MAXIMUM OF 150 CHARACTERS.")
    private String name;

    @NotBlank(message = "THE name FIELD IS REQUIRED.")
    @Size(max = 1000, message = "THE url FIELD MUST HAVE A MAXIMUM OF 1000 CHARACTERS.")
    private String url;

    @NotBlank(message = "THE type FIELD IS REQUIRED.")
    @Size(max = 150, message = "THE type FIELD MUST HAVE A MAXIMUM OF 150 CHARACTERS.")
    private String type;

    @NotNull(message = "THE lastModified IS REQUIRED.")
    private Long lastModified;

    @NotNull(message = "THE lastModified IS REQUIRED.")
    private Long size;

    @NotBlank(message = "THE idTask FIELD IS REQUIRED.")
    @Size(max = 500, message = "THE idPublishedTask FIELD MUST HAVE A MAXIMUM OF 500 CHARACTERS.")
    private String idPublishedTask;

    public PublishedFileDTO() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getLastModified() {
        return lastModified;
    }

    public void setLastModified(Long lastModified) {
        this.lastModified = lastModified;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public String getIdPublishedTask() {
        return idPublishedTask;
    }

    public void setIdPublishedTask(String idPublishedTask) {
        this.idPublishedTask = idPublishedTask;
    }

    @Override
    public String toString() {
        return "PublishedFileDTO{"
                + "\nid=" + id
                + ", \nname=" + name
                + ", \nurl=" + url
                + ", \ntype=" + type
                + ", \nlastModified=" + lastModified
                + ", \nsize=" + size
                + ", \nidPublishedTask=" + idPublishedTask + "\n"
                + '}';
    }

}
