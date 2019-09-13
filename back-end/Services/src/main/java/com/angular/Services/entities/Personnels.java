package com.angular.Services.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Personnels implements Serializable {
    @Id
    @GeneratedValue
    private Long idPersonnel;
    private String date_embauche;
    private String nom;
    private String prenom;
    private String date_naissance;
    private String cin;
    private String type_contrat;
    private String tel1;
    private String tel2;
    private String adresse;
    private String matricule;
    private String poste_occupe;
    @OneToMany(mappedBy="personnel")
    @JsonIgnore
        private List<Conges> listeConges;



}
