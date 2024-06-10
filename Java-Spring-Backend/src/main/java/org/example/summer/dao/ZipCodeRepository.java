package org.example.summer.dao;

import org.example.summer.entity.ZipCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin
public interface ZipCodesRepository extends JpaRepository<ZipCode, Integer> {
}
