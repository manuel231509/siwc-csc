package com.colegiosantacecilia.siwcspringjava.commons;

import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Sebastian Villamizar
 * @param <T>
 * @param <ID>
 *
 */
public abstract class GenericServiceImpl<T, ID extends Serializable> implements GenericService<T, ID> {

    @Override
    @Transactional
    public T save(T entity) {
        return getJpaRepository().save(entity);
    }

    @Override
    @Transactional
    public void deleteById(ID id) {
        getJpaRepository().deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<T> getById(ID id) {
        return getJpaRepository().findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<T> getAll() {
        List<T> returnList = new LinkedList<>();
        getJpaRepository().findAll().forEach(obj -> returnList.add(obj));
        return returnList;
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<T> getAll(Sort dynamicSort) {
        List<T> returnList = new LinkedList<>();
        getJpaRepository().findAll(dynamicSort).forEach(obj -> returnList.add(obj));
        return returnList;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<T> getAllPage(Pageable pageable) {
        return getJpaRepository().findAll(pageable);
    }

    @Override
    public Sort createDynamicSort(String[] arrayOrdre) {
        return Sort.by(arrayOrdre);
    }

    public abstract JpaRepository<T, ID> getJpaRepository();

}
