package com.angular.Services.controllers;


import com.angular.Services.Repositories.IPersonnel;
import com.angular.Services.entities.Personnels;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/personnels")
public class PersonnelController {
    @Autowired
    private IPersonnel personnelRepo;
    @GetMapping("/")
    public ResponseEntity getPersonnels(){
        return ResponseEntity.ok().body(personnelRepo.findAll());}
    @GetMapping("/{idPersonnel}")
    public ResponseEntity getPersonnel(@PathVariable(name="idPersonnel") Long idPersonnel)   {
        if (idPersonnel==null){
            return ResponseEntity.badRequest().body("entrer un id personnels");
        }
        Personnels perso=personnelRepo.getOne(idPersonnel);
        if (perso==null){
            return  ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(perso);
    }

    @PostMapping("/")
    public  ResponseEntity createPersonnel(@RequestBody Personnels perso) {

       Personnels persoCreated =personnelRepo.save(perso);
       return  ResponseEntity.ok().body(persoCreated);

    }
    @DeleteMapping("/delete/{idPersonnel}")
    public ResponseEntity deletePersonnel(@PathVariable(name="idPersonnel") Long idPersonnel){
        if (idPersonnel==null){
            return ResponseEntity.badRequest().body("entrer un id personnel");
        }
        Personnels perso=personnelRepo.getOne(idPersonnel);
        if (perso==null){
            return ResponseEntity.notFound().build();
        }
        personnelRepo.delete(perso);
        return ResponseEntity.ok().body("le personnel a été bien supprimé") ;
    }
      @PutMapping("/edit/{idPersonnel}")
      public  ResponseEntity updatePersonnel (@RequestBody Personnels perso,@PathVariable("idPersonnel") Long idPersonnel)
      {
         Optional<Personnels> PersoOptional=personnelRepo.findById(idPersonnel);
          if (!PersoOptional.isPresent())
          perso.setIdPersonnel(idPersonnel);
          Personnels p=personnelRepo.save(perso);
          return ResponseEntity.ok().body(p);

      }

}
