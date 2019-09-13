package com.angular.Services.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Conges {
    @Id
    @GeneratedValue
    private Long idConges;
    private String dureeD;
    private String dureeF;

    private String raisons;
    @ManyToOne
    @JoinColumn(name="idPersonnel")
    private Personnels personnel;



}
