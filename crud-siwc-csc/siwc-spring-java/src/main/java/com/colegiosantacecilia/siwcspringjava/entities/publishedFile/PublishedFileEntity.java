package com.colegiosantacecilia.siwcspringjava.entities.publishedFile;

import com.colegiosantacecilia.siwcspringjava.entities.publishedTask.PublishedTaskEntity;
import java.io.Serializable;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ConstraintMode;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

/**
 *
 * @author Sebastian Villamizar
 */
@Entity
@Table(name = "published_file")
public class PublishedFileEntity implements Serializable {

    private static final long serialVersionUID = -9069060843698080433L;

    @Id
    @Column(name = "id_file", length = 500)
    private String idFile;

    @Column(name = "file_name", length = 500)
    private String fileName;

    @Column(name = "file_url", length = 1000)
    private String fileUrl;

    @Column(name = "file_type", length = 150)
    private String fileType;

    @Column(name = "file_last_modified")
    private Long fileLastModified;

    @Column(name = "file_size")
    private Long fileSize;

    @Column(name = "id_published_task", length = 500, nullable = false)
    private String idPublishedTask;

    @ManyToOne(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            optional = false)
    @MapsId(value = "idPublishedTask")
    @JoinColumn(name = "id_published_task",
            foreignKey = @ForeignKey(name = "published_file_task_FK",
                    value = ConstraintMode.CONSTRAINT),
            nullable = false, insertable = false, updatable = false)
    private PublishedTaskEntity publishedTaskEntity;

    public PublishedFileEntity() {
    }

    public String getIdFile() {
        return idFile;
    }

    public void setIdFile(String idFile) {
        this.idFile = idFile;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public Long getFileLastModified() {
        return fileLastModified;
    }

    public void setFileLastModified(Long fileLastModified) {
        this.fileLastModified = fileLastModified;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public String getIdPublishedTask() {
        return idPublishedTask;
    }

    public void setIdPublishedTask(String idPublishedTask) {
        this.idPublishedTask = idPublishedTask;
    }

    @Override
    public String toString() {
        return "PublishedFileEntity{"
                + "\nidFile=" + idFile
                + ", \nfileName=" + fileName
                + ", \nfileUrl=" + fileUrl
                + ", \nfileType=" + fileType
                + ", \nfileLastModified=" + fileLastModified
                + ", \nfileSize=" + fileSize
                + ", \nidPublishedTask=" + idPublishedTask
                + ", \npublishedTaskEntity=" + publishedTaskEntity + "\n"
                + '}';
    }

}
