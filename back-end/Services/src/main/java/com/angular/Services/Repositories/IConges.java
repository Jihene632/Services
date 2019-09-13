package com.angular.Services.Repositories;

import com.angular.Services.entities.Conges;
import com.angular.Services.entities.Personnels;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IConges extends JpaRepository <Conges,Long> {
    List<Conges> findByPersonnel(Personnels p);
}
