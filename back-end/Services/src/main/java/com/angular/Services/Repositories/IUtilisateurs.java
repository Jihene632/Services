package com.angular.Services.Repositories;
import com.angular.Services.entities.utilisateurs;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUtilisateurs extends JpaRepository<utilisateurs,Long> {
    utilisateurs findByLoginAndPassword (String login,String password);


}