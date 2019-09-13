package com.angular.Services.entities;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import java.io.Serializable;


@Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Entity
    @Builder
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})


    public class utilisateurs implements Serializable {
        @Id
        @GeneratedValue
        private Long idUser;
        private String nom;
        private String prenom;
        private String date_naissance;
        private String role;
        private String login;
        private String password;
        private String gender;
        @Lob
        private byte[] photo;

    }


