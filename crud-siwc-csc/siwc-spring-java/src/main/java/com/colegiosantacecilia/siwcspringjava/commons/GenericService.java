/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.colegiosantacecilia.siwcspringjava.commons;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

/**
 *
 * @author Sebastian Villamizar
 * @param <T>
 * @param <ID>
 *
 */
public interface GenericService<T, ID extends Serializable> {

    T save(T entity);

    void deleteById(ID id);

    Optional<T> getById(ID id);

    List<T> getAll();

    List<T> getAll(Sort dynamicSort);
    
    Sort createDynamicSort(String[] arrayOrdre);
    
    Page<T> getAllPage(Pageable pageable);    
}
