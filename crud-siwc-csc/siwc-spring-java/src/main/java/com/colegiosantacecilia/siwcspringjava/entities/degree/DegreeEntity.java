package com.colegiosantacecilia.siwcspringjava.entities.degree;

import com.colegiosantacecilia.siwcspringjava.entities.degreeSubject.DegreeSubjectEntity;
import com.colegiosantacecilia.siwcspringjava.entities.student.StudentEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;
import javax.persistence.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

/**
 *
 * @author Sebastian Villamizar
 */
@Entity
@Table(name = "degree")
@JsonInclude(JsonInclude.Include.NON_EMPTY)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class DegreeEntity implements Serializable {

    private static final long serialVersionUID = -9069060843698080433L;

    @Id
    @Column(name = "id_degree", length = 500)
    private String idDegree;

    @Column(name = "name_degree", nullable = false, unique = true, length = 10)
    private String nameDegree;

    @OneToMany(mappedBy = "degreeEntity",
            cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    private List<StudentEntity> studentEntitys
            = new LinkedList<>();

    @OneToMany(mappedBy = "degreeEntity",
            cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    private List<DegreeSubjectEntity> degreeSubjectEntitys
            = new LinkedList<>();

    public DegreeEntity() {
    }

    public String getIdDegree() {
        return idDegree;
    }

    public void setIdDegree(String idDegree) {
        this.idDegree = idDegree;
    }

    public String getNameDegree() {
        return nameDegree;
    }

    public void setNameDegree(String nameDegree) {
        this.nameDegree = nameDegree;
    }

    public List<StudentEntity> getStudentEntitys() {
        return studentEntitys;
    }

    public void setStudentEntitys(List<StudentEntity> studentEntitys) {
        this.studentEntitys = studentEntitys;
    }

    public void addListStudentEntitys(StudentEntity se) {
        this.studentEntitys.add(se);
    }

    public List<DegreeSubjectEntity> getDegreeSubjectEntitys() {
        return degreeSubjectEntitys;
    }

    public void setDegreeSubjectEntitys(List<DegreeSubjectEntity> degreeSubjectEntitys) {
        this.degreeSubjectEntitys = degreeSubjectEntitys;
    }

    public void addListDegreeSubjectEntitys(DegreeSubjectEntity dse) {
        this.degreeSubjectEntitys.add(dse);
    }

    @Override
    public String toString() {
        return "DegreeEntity{"
                + "\nidDegree=" + idDegree
                + ", \nnameDegree=" + nameDegree
                + ", \nstudentEntitys=" + studentEntitys
                + ", \ndegreeSubjectEntitys=" + degreeSubjectEntitys
                + "\n" + '}';
    }
}
