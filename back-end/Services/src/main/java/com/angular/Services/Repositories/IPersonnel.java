package com.angular.Services.Repositories;

import com.angular.Services.entities.Personnels;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPersonnel extends JpaRepository<Personnels,Long> {
}
